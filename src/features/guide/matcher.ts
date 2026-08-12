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

export function matchGuide(answers: GuideAnswers): GuideMatch[] {
  if (answers.platform === 'browser') return [
    reason('webllm', 'WebGPU ile model doğrudan tarayıcıda çalışır.', 'Runs the model directly in the browser through WebGPU.', 'İstemci belleği ve WebGPU desteğini doğrulayın.', 'Validate client memory and WebGPU support.'),
    reason('mlc-llm', 'Aynı derleme yığını farklı uç hedeflere taşınabilir.', 'The same compiler stack can target multiple edge environments.', 'Model derleme desteğini kontrol edin.', 'Check model compilation support.'),
  ]
  if (answers.platform === 'kubernetes' || answers.scale === 'cluster') return [
    reason('kserve', 'Kubernetes üzerinde standart LLM servis kaynakları ve ölçekleme sunar.', 'Provides standardized LLM-serving resources and scaling on Kubernetes.', 'Kubernetes işletme maliyetini hesaba katın.', 'Account for Kubernetes operational overhead.'),
    reason('llm-d', 'Dağıtık LLM bileşenlerini açık Kubernetes mimarisinde birleştirir.', 'Combines distributed LLM components in an open Kubernetes architecture.', 'Proje erken aşamadadır.', 'The project is early-stage.'),
    reason('nvidia-dynamo', 'Çok düğümlü GPU çıkarımını ayrıştırılmış servisle hedefler.', 'Targets multi-node GPU inference through disaggregated serving.', 'NVIDIA ekosistem bağımlılığını değerlendirin.', 'Evaluate NVIDIA ecosystem coupling.'),
  ]
  if (answers.scope === 'production' || answers.scale === 'multi') return [
    reason('vllm', 'Eşzamanlı üretim API’leri için güçlü ve yaygın bir sunum tabanıdır.', 'A strong and widely adopted serving base for concurrent production APIs.', 'Ayarları gerçek iş yükünüzle ölçün.', 'Benchmark settings on your actual workload.'),
    reason('sglang', 'Önbellek ve yapılandırılmış üretim ağırlıklı servis işlerine uygundur.', 'Fits serving workloads centered on caching and structured generation.', 'Hızla gelişen API yüzeyini izleyin.', 'Track its fast-moving API surface.'),
    reason('bentoml', 'Özel Python mantığını model servisiyle paketler.', 'Packages custom Python logic with the model service.', 'Motor performansı seçilen arka uca bağlıdır.', 'Engine performance depends on the backend.'),
  ]
  if (answers.hardware === 'apple') return [
    reason('mlx-lm', 'Apple Silicon ve birleşik bellek için doğal çalışma yolu sunar.', 'Offers a native path for Apple Silicon and unified memory.', 'Yalnızca Apple donanımını hedefler.', 'Targets Apple hardware only.'),
    reason('lm-studio', 'Mac üzerinde grafik model keşfi ve yerel API sağlar.', 'Provides graphical model discovery and a local API on Mac.', 'Kapalı kaynaklı ürün bileşenlerini değerlendirin.', 'Consider proprietary product components.'),
    reason('llama-cpp', 'GGUF ile taşınabilir ve ayrıntılı yerel kontrol sunar.', 'Provides portable, detailed local control through GGUF.', 'Model formatı ve ayar seçimi gerekir.', 'Model-format and tuning choices are required.'),
  ]
  if (answers.hardware === 'nvidia') return [
    reason('ollama', 'Yerel NVIDIA GPU geliştirmesine en düşük sürtünmeli başlangıçlardan biridir.', 'One of the lowest-friction starts for local NVIDIA-GPU development.', 'Üretim ölçeği için servis katmanını ayrıca değerlendirin.', 'Evaluate a dedicated serving layer for production scale.'),
    reason('exllamav3', 'Tüketici NVIDIA GPU’larında düşük bitli modellere odaklanır.', 'Focuses on low-bit models on consumer NVIDIA GPUs.', 'Deneysel proje durumunu göz önünde bulundurun.', 'Account for its experimental status.'),
    reason('llama-cpp', 'CUDA yanında farklı donanımlara taşınabilir.', 'Can move to other hardware beyond CUDA.', 'En hızlı ayarlar modele göre değişir.', 'Best settings vary by model.'),
  ]
  return [reason('llama-cpp', 'CPU üzerinde taşınabilir yerel çıkarım sunar.', 'Offers portable local inference on CPU.', 'Model boyutunu kullanılabilir belleğe göre seçin.', 'Size the model to available memory.')]
}
