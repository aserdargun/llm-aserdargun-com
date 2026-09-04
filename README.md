# LLM Runtime & Serving Atlas

[Türkçe](#türkçe) · [English](#english)

## Türkçe

LLM Runtime & Serving Atlas, yerel çalıştırıcılardan üretim sunucularına, dağıtık çıkarım platformlarından ağ geçitlerine kadar LLM çalıştırma ve sunma ekosistemini yedi mimari katmanda sınıflandıran, kaynaklara dayalı bir alan rehberidir.

Atlas, TensorRT-LLM, vLLM, SGLang, Ollama ve LM Studio gibi farklı sorumluluklara sahip araçları tek bir “hız sıralaması” içinde göstermenin neden yanıltıcı olduğunu açıklar. Bunun yerine çözümün mimari rolünü, donanım ve dağıtım uyumunu, proje durumunu ve resmî kaynaklarını birlikte görünür kılar.

### Kapsam

| Kod | Mimari katman | Çözüm sayısı |
| --- | --- | ---: |
| INF | Çıkarım Motorları ve Çalışma Zamanları | 8 |
| SRV | Model Sunucuları ve Servis Çerçeveleri | 7 |
| RUN | Yerel Model Çalıştırıcıları ve Yöneticileri | 3 |
| APP | Masaüstü Yerel LLM Çalışma Alanları | 5 |
| DST | Dağıtık Çıkarım Platformları | 4 |
| GTW | LLM Ağ Geçitleri ve Yönlendiriciler | 2 |
| EDG | Uç ve Cihaz Üzeri Çalışma Zamanları | 2 |

Toplam 31 kaydın resmî kaynak uçları 4 Eylül 2026 tarihinde yeniden denetlendi. Hızlı değişen yaşam döngüsü ve uyumluluk kayıtları güncellendi; her profil kendi son doğrulama tarihini taşır. İzlenen yaklaşım uygulamanın Metodoloji sayfasında açıklanır.

### Özellikler

- Türkçe ve İngilizce arayüz; dil değişiminde filtre ve karşılaştırma durumu korunur.
- URL ile paylaşılabilen arama, filtre ve en fazla dört çözümü karşılaştırma akışı.
- Farklı mimari katmanlar birlikte seçildiğinde bağlamsal uyarı.
- Beş soruluk, gerekçeli kısa liste üreten seçim rehberi.
- Her çözüm için rol, ideal kullanım, uyumluluk, yaşam döngüsü ve resmî kaynak profili.
- Masaüstü tablo ve mobil kart/çekmece deneyimi.
- **Öğrenme katmanı**: 30 kavram (3 seviye derinlik + görsel), 92 bilgi kartı (SM-2 aralıklı tekrar), 90 test sorusu ve 6 mini ders; tüm ilerleme cihazda saklanır, hesap gerekmez.

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

Official source endpoints for all 31 records were checked again on September 4, 2026. Fast-moving lifecycle and compatibility records were refreshed, while every profile retains its own last-verified date. See the in-app Methodology page for the evidence, freshness, lifecycle, and performance policies.

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
