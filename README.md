# LLM Runtime & Serving Atlas

[Türkçe](#türkçe) · [English](#english)

## Türkçe

LLM Runtime & Serving Atlas, yerel çalıştırıcılardan üretim sunucularına, dağıtık çıkarım platformlarından ağ geçitlerine kadar LLM çalıştırma ve sunma ekosistemini yedi mimari katmanda sınıflandıran, kaynaklara dayalı bir alan rehberidir.

Atlas, TensorRT-LLM, vLLM, SGLang, Ollama ve LM Studio gibi farklı sorumluluklara sahip araçları tek bir “hız sıralaması” içinde göstermenin neden yanıltıcı olduğunu açıklar. Bunun yerine çözümün mimari rolünü, donanım ve dağıtım uyumunu, proje durumunu ve resmi kaynaklarını birlikte görünür kılar.

### Kapsam

| Kod | Mimari katman | Çözüm sayısı |
| --- | --- | ---: |
| INF | Çıkarım Motorları ve Çalışma Zamanları | 8 |
| SRV | Model Sunucuları ve Servis Çerçeveleri | 6 |
| RUN | Yerel Model Çalıştırıcıları ve Yöneticileri | 3 |
| APP | Masaüstü Yerel LLM Çalışma Alanları | 5 |
| DST | Dağıtık Çıkarım Platformları | 4 |
| GTW | LLM Ağ Geçitleri ve Yönlendiriciler | 2 |
| EDG | Uç ve Cihaz Üzeri Çalışma Zamanları | 3 |

Toplam 31 kayıt 12 Ağustos 2026 tarihinde resmi dokümantasyon veya resmi proje depoları üzerinden doğrulandı. Yaşam döngüsü ve performans iddiaları için izlenen yaklaşım uygulamanın Metodoloji sayfasında açıklanır.

### Özellikler

- Türkçe ve İngilizce arayüz; dil değişiminde filtre ve karşılaştırma durumu korunur.
- URL ile paylaşılabilen arama, filtre ve en fazla dört çözümü karşılaştırma akışı.
- Farklı mimari katmanlar birlikte seçildiğinde bağlamsal uyarı.
- Beş soruluk, gerekçeli kısa liste üreten seçim rehberi.
- Her çözüm için rol, ideal kullanım, uyumluluk, yaşam döngüsü ve resmi kaynak profili.
- Masaüstü tablo ve mobil kart/çekmece deneyimi.
- **Öğrenme katmanı**: 30 kavram (3 seviye derinlik + görsel), 92 flashcard (SM-2 spaced repetition), 90 quiz ve 6 mini-ders; tüm ilerleme cihazda saklanır, hesap gerekmez.

### Yerel geliştirme

Node.js 22 ve npm gereklidir.

```bash
npm ci
npx playwright install chromium
npm run dev
```

Kalite kontrolleri:

```bash
npm run check
npm run test:e2e
```

Üretim çıktısı `dist/` dizinine yazılır. Uygulama çalışma zamanında sır veya sunucu tarafı API kullanmaz.

### Azure Static Web Apps

Depo iki iş akışı içerir:

- `CI`: veri doğrulama, birim/bileşen testleri, lint, TypeScript, üretim derlemesi ve Playwright E2E.
- `Azure Static Web Apps`: `main` dalındaki doğrulanmış uygulamayı Azure’a dağıtır.

Dağıtım iş akışı için GitHub Actions deposuna `AZURE_STATIC_WEB_APPS_API_TOKEN_SWA_LLM_ASERDARGUN_COM` adlı secret eklenmelidir. SPA yönlendirmesi ve güvenlik başlıkları `public/staticwebapp.config.json` içinde tanımlıdır.

## English

LLM Runtime & Serving Atlas is a source-backed field guide that maps the LLM runtime and serving ecosystem across seven architectural layers—from local runners and production servers to distributed inference platforms and gateways.

It explains why tools such as TensorRT-LLM, vLLM, SGLang, Ollama, and LM Studio should not be reduced to one universal speed ranking. The atlas instead presents architectural role, hardware and deployment compatibility, project status, and official sources together.

The initial dataset contains 31 records verified against official documentation or official repositories on August 12, 2026. See the in-app Methodology page for the evidence, freshness, lifecycle, and performance policies.

### Features

- Bilingual Turkish and English UI; filters and compare state are preserved across locale switches.
- URL-shareable search, filters, and up to four-solution comparison.
- Cross-layer warning when architectural roles are mixed.
- Five-question selection guide that returns a justified short list.
- Per-solution profile: role, ideal use, compatibility, lifecycle, official sources.
- Desktop table and mobile card/drawer experience.
- **Learning layer**: 30 concepts (3 readability levels + visual), 92 flashcards (SM-2 spaced repetition), 90 quiz questions and 6 mini-lessons. All progress is stored on-device, no account required.

### Stack

React 19, TypeScript, Vite, React Router, Zod, Vitest, Testing Library, and Playwright. The site is a static client application with no runtime secrets or backend dependency.

### Repository map

- `src/data/`: validated category, solution, concept, flashcard, quiz, and lesson records.
- `src/features/`: pure filter, comparison, freshness, guide, and learning logic.
- `src/pages/`: localized application routes (atlas + learn hub + concepts/flashcards/quiz/lessons).
- `e2e/`: desktop and mobile critical-path tests.
- `docs/design/`: approved Layered Atlas visual references.
- `docs/learning-transformation-plan.md`: plan and verification log for the learning layer.
- `docs/fidelity-ledger.md`: reference-to-render QA record.

## License

Released under the [MIT License](LICENSE).
