import { solutions } from '@/data/solutions'
import type { LocalizedText } from '@/types/atlas'

export interface GuideAnswers {
  hardware: 'apple' | 'nvidia' | 'cpu' | 'edge'
  scope: 'local' | 'production' | 'device'
  interface: 'desktop' | 'developer' | 'api' | 'app'
  scale: 'single' | 'multi' | 'cluster'
  platform: 'none' | 'server' | 'kubernetes' | 'browser'
}

export interface GuideMatch { slug: string; reason: LocalizedText; caveat: LocalizedText }
const reason = (slug: string, tr: string, en: string, caveatTr: string, caveatEn: string): GuideMatch => ({ slug, reason: { tr, en }, caveat: { tr: caveatTr, en: caveatEn } })

export function guideConflicts(answers: GuideAnswers): LocalizedText[] {
  const conflicts: LocalizedText[] = []
  if ((answers.scope === 'device' || answers.hardware === 'edge' || answers.platform === 'browser') &&
      (answers.scale === 'cluster' || answers.platform === 'kubernetes' || answers.platform === 'server' || answers.scope === 'production')) {
    conflicts.push({ tr: 'Cihaz içinde veya tarayıcıda çıkarım ile sunucu/küme hedefini birlikte seçtiniz. Modelin nerede çalışacağını netleştirin.', en: 'On-device or browser inference conflicts with the server/cluster target. Clarify where the model should run.' })
  }
  if (answers.interface === 'desktop' && (answers.scope !== 'local' || answers.hardware === 'edge' || answers.platform !== 'none' || answers.scale !== 'single')) {
    conflicts.push({ tr: 'Masaüstü arayüzü için yerel, tek kullanıcılı bir senaryo seçin; sunucu ve gömülü uygulama için arayüz tercihini değiştirin.', en: 'Choose a local, single-user scenario for a desktop GUI; change the interface preference for a server or embedded app.' })
  }
  return conflicts
}

export function matchGuide(answers: GuideAnswers): GuideMatch[] {
  if (guideConflicts(answers).length) return []
  const hardware = { apple: 'Apple Silicon', nvidia: 'NVIDIA GPU', cpu: 'CPU', edge: 'Mobile GPU' }[answers.hardware]
  return candidates(answers).filter((match) => {
    const solution = solutions.find((item) => item.slug === match.slug)
    if (!solution) return false
    if (answers.platform === 'browser') return solution.deploymentScopes.includes('Browser') && answers.hardware !== 'cpu'
    if (answers.hardware === 'edge') return solution.deploymentScopes.some((scope) => ['Mobile', 'Edge', 'Embedded'].includes(scope))
    return solution.hardware.includes(hardware)
  })
}

function candidates(answers: GuideAnswers): GuideMatch[] {
  if (answers.interface === 'desktop') return [
    reason('lm-studio', 'Grafik model indirme, sohbet ve yerel API deneyimi sağlar.', 'Provides graphical model downloads, chat and a local API.', 'Modelin bellek gereksinimini ve işletim sistemi desteğini kontrol edin.', 'Check model memory requirements and operating-system support.'),
    reason('jan', 'Yerel modeller için masaüstü sohbet arayüzü sunar.', 'Provides a desktop chat interface for local models.', 'Seçilen motor ve modelin donanım desteğini doğrulayın.', 'Verify hardware support for the selected engine and model.'),
  ]
  if (answers.platform !== 'browser' && (answers.hardware === 'edge' || answers.scope === 'device' || answers.interface === 'app')) return [
    reason('mlc-llm', 'Modeli uygulamaya ve mobil hedeflere gömmek için derleme yolu sunar.', 'Provides a compilation path for embedding models in apps and mobile targets.', 'Hedef cihaz, model derlemesi ve bellek bütçesi birlikte doğrulanmalıdır.', 'Validate the target device, model compilation and memory budget together.'),
    reason('executorch', 'Cihaz üzerinde model yürütme ve mobil entegrasyon sağlar.', 'Provides on-device model execution and mobile integration.', 'Operatör ve cihaz arka ucu desteğini kontrol edin.', 'Check operator and device backend support.'),
  ]

  if (answers.platform === 'browser') return [
    reason('webllm', 'WebGPU ile model doğrudan tarayıcıda çalışır.', 'Runs the model directly in the browser through WebGPU.', 'İstemci belleği ve WebGPU desteğini doğrulayın.', 'Validate client memory and WebGPU support.'),
    reason('mlc-llm', 'Aynı derleme yığını farklı uç hedeflere taşınabilir.', 'The same compiler stack can target multiple edge environments.', 'Model derleme desteğini kontrol edin.', 'Check model compilation support.'),
  ]
  if (answers.platform === 'kubernetes' || answers.scale === 'cluster') return [
    reason('kserve', 'Kubernetes üzerinde standart LLM servis kaynakları ve ölçekleme sunar.', 'Provides standardized LLM-serving resources and scaling on Kubernetes.', 'Kubernetes işletme maliyetini hesaba katın.', 'Account for Kubernetes operational overhead.'),
    reason('llm-d', 'Dağıtık LLM bileşenlerini açık Kubernetes mimarisinde birleştirir.', 'Combines distributed LLM components in an open Kubernetes architecture.', 'Desteklenen dağıtım tarifini ve motor sürümünü doğrulayın.', 'Verify the supported deployment recipe and engine release.'),
    reason('nvidia-dynamo', 'Çok düğümlü GPU çıkarımını ayrıştırılmış servisle hedefler.', 'Targets multi-node GPU inference through disaggregated serving.', 'NVIDIA ekosistem bağımlılığını değerlendirin.', 'Evaluate NVIDIA ecosystem coupling.'),
  ]
  if (answers.hardware === 'apple' && (answers.scope === 'production' || answers.interface === 'api' || answers.scale === 'multi' || answers.platform === 'server')) return [
    reason('localai', 'Uyumlu bir arka uçla yerel API servisi kurmanızı sağlar.', 'Provides a local API service with a compatible backend.', 'Apple Silicon arka ucunu, eşzamanlılığı ve kimlik doğrulamayı doğrulayın.', 'Validate the Apple Silicon backend, concurrency and authentication.'),
    reason('llama-cpp', 'Apple Silicon üzerinde GGUF modelleri için yerel HTTP sunucusu sağlar.', 'Provides a local HTTP server for GGUF models on Apple Silicon.', 'Üretim kapasitesi ve servis güvenliği ayrıca ölçülmelidir.', 'Measure production capacity and validate serving security separately.'),
  ]
  if (answers.scope === 'production' || answers.scale === 'multi' || answers.platform === 'server') return [
    reason('vllm', 'Eşzamanlı üretim API’leri için güçlü ve yaygın bir sunum tabanıdır.', 'A strong and widely adopted serving base for concurrent production APIs.', 'Ayarları gerçek iş yükünüzle ölçün.', 'Benchmark settings on your actual workload.'),
    reason('sglang', 'Önbellek ve yapılandırılmış üretim ağırlıklı servis işlerine uygundur.', 'Fits serving workloads centered on caching and structured generation.', 'Hızla gelişen API yüzeyini izleyin.', 'Track its fast-moving API surface.'),
    reason('bentoml', 'Özel Python mantığını model servisiyle paketler.', 'Packages custom Python logic with the model service.', 'Motor performansı seçilen arka uca bağlıdır.', 'Engine performance depends on the backend.'),
  ]
  if (answers.interface === 'api') return [
    reason('localai', 'Yerel modelleri API üzerinden sunar.', 'Serves local models through an API.', 'Arka uç ve donanım uyumunu doğrulayın.', 'Verify backend and hardware compatibility.'),
    reason('llama-cpp', 'Yerel çıkarımı HTTP sunucusuyla uygulamalara açar.', 'Exposes local inference to applications through an HTTP server.', 'Model formatı ve bellek gereksinimlerini kontrol edin.', 'Check model format and memory requirements.'),
  ]
  if (answers.hardware === 'apple') return [
    reason('mlx-lm', 'Apple Silicon ve birleşik bellek için doğal çalışma yolu sunar.', 'Offers a native path for Apple Silicon and unified memory.', 'Yalnızca Apple donanımını hedefler.', 'Targets Apple hardware only.'),
    reason('lm-studio', 'Mac üzerinde grafik model keşfi ve yerel API sağlar.', 'Provides graphical model discovery and a local API on Mac.', 'Kapalı kaynaklı ürün bileşenlerini değerlendirin.', 'Consider proprietary product components.'),
    reason('llama-cpp', 'GGUF ile taşınabilir ve ayrıntılı yerel kontrol sunar.', 'Provides portable, detailed local control through GGUF.', 'Model formatı ve ayar seçimi gerekir.', 'Model-format and tuning choices are required.'),
  ]
  if (answers.hardware === 'nvidia') return [
    reason('ollama', 'Yerel NVIDIA GPU geliştirmesine en düşük sürtünmeli başlangıçlardan biridir.', 'One of the lowest-friction starts for local NVIDIA-GPU development.', 'Üretim ölçeği için servis katmanını ayrıca değerlendirin.', 'Evaluate a dedicated serving layer for production scale.'),
    reason('exllamav3', 'Tüketici NVIDIA GPU’larında düşük bitli modellere odaklanır.', 'Focuses on low-bit models on consumer NVIDIA GPUs.', 'EXL3 model biçimini ve GPU desteğini doğrulayın.', 'Verify the EXL3 model format and GPU support.'),
    reason('llama-cpp', 'CUDA yanında farklı donanımlara taşınabilir.', 'Can move to other hardware beyond CUDA.', 'En hızlı ayarlar modele göre değişir.', 'Best settings vary by model.'),
  ]
  return [reason('llama-cpp', 'CPU üzerinde taşınabilir yerel çıkarım sunar.', 'Offers portable local inference on CPU.', 'Model boyutunu kullanılabilir belleğe göre seçin.', 'Size the model to available memory.')]
}
