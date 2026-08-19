# LLM Atlas → Kalıcı Öğrenme Deneyimi Dönüşüm Planı

**Tarih:** 2026-08-19
**Hedef:** Mevcut "LLM Runtime & Serving Atlas" referans alan rehberini, üniversite öğrencisi seviyesinde **görsellerle desteklenmiş, kalıcı öğrenme sağlayan** bir uygulamaya dönüştürmek.

---

## 1. Kapsam ve sınır

**Korunacak (Atlas omurgası):**
- 31 çözüm, 7 mimari katman (mevcut `src/data/solutions.ts`, `categories.ts`)
- Explore, Compare, Solution, Guide, Methodology sayfaları
- TR/EN çift dilli yapı, URL paylaşımı, kaynak doğrulama sistemi

**Eklenecek (öğrenme katmanı):**
- Kavram Sözlüğü — 30 kavram, her biri 3 seviye + görsel
- Spaced Repetition Flashcard — SM-2 algoritması
- Quiz modu — çoktan seçmeli, doğru/yanlış, eşleştirme
- Senaryo Mini-Dersleri — 5-10 görsel adım adım rehber
- Anonim localStorage ilerleme takibi (streak, tekrar kuyruğu, favoriler)

**Kapsam dışı:**
- Backend / auth (statik SPA, tüm veri cihazda)
- Gerçek zamanlı içerik düzenleme (içerik build-time)
- Çok oyunculu / sosyal özellikler
- Mevcut Atlas verisinin silinmesi/değiştirilmesi (sadece genişletme)

---

## 2. Yeni modül yapısı

```
src/
├── data/                       (mevcut + yeni)
│   ├── solutions.ts            (korunur)
│   ├── categories.ts           (korunur)
│   ├── concepts.ts             ★ YENİ — 30 kavram, 3 seviye açıklama
│   ├── flashcards.ts           ★ YENİ — Kavramlar + çözümler için kartlar
│   ├── quizzes.ts              ★ YENİ — Çoktan seçmeli, doğru/yanlış, eşleştirme
│   └── lessons.ts              ★ YENİ — Senaryo mini-dersleri (5-10 adım)
│
├── features/                   (mevcut + yeni)
│   ├── freshness.ts            (korunur)
│   ├── compare/                (korunur)
│   ├── explore/                (korunur)
│   ├── guide/                  (korunur)
│   ├── learning/               ★ YENİ
│   │   ├── sm2.ts              — SM-2 spaced repetition algoritması
│   │   ├── progress.ts         — localStorage adapter (streak, queue, stats)
│   │   └── selectors.ts        — "bugün tekrar", "yeni kart", "güçlü konular"
│
├── pages/                      (mevcut + yeni)
│   ├── HomePage.tsx            (korunur + öğrenme rozetleri)
│   ├── ExplorePage.tsx         (korunur)
│   ├── ComparePage.tsx         (korunur)
│   ├── SolutionPage.tsx        (korunur + "bu çözümü öğren" bölümü)
│   ├── GuidePage.tsx           (korunur)
│   ├── MethodologyPage.tsx     (korunur)
│   ├── NotFoundPage.tsx        (korunur)
│   ├── LearnHomePage.tsx       ★ YENİ — /learn, dashboard
│   ├── ConceptsPage.tsx        ★ YENİ — /concepts, kavram listesi + arama
│   ├── ConceptPage.tsx         ★ YENİ — /concepts/:slug, 3 seviye + görsel
│   ├── FlashcardsPage.tsx      ★ YENİ — /flashcards, SM-2 oturumu
│   ├── QuizPage.tsx            ★ YENİ — /quiz, kategori seç + test
│   └── LessonsPage.tsx         ★ YENİ — /lessons, mini-ders listesi
│
├── components/                 (mevcut + yeni)
│   ├── (mevcut)                — korunur
│   ├── ConceptCard.tsx         ★ YENİ — kavram önizleme
│   ├── FlashcardDeck.tsx       ★ YENİ — kart çevirme + değerlendirme
│   ├── QuizQuestion.tsx        ★ YENİ — soru + cevap kontrolü
│   ├── LessonStepper.tsx       ★ YENİ — adım adım görsel
│   ├── StreakBadge.tsx         ★ YENİ — günlük seri rozeti
│   └── ProgressRing.tsx        ★ YENİ — günlük/haftalık ilerleme
│
└── i18n/
    ├── copy.ts                 (korunur + yeni öğrenme stringleri)
    └── learn-copy.ts           ★ YENİ — öğrenme modülü çevirileri
```

**Yeni nav linkleri:** Atlas (mevcut) · Keşfet · Karşılaştır · **Öğren** · **Kavramlar** · **Quiz** · **Dersler** · Rehber · Metodoloji

---

## 3. Veri şeması (TypeScript)

```ts
// src/types/learning.ts

// 3 seviye: günlük dil, öğrenci açıklaması, ileri seviye
export interface Concept {
  slug: string
  name: LocalizedText
  short: LocalizedText          // 1 cümle özet
  beginner: LocalizedText       // Günlük dil, metafor
  intermediate: LocalizedText   // Teknik detay, neden var
  advanced: LocalizedText       // Derin matematik/uygulama
  visual: 'token-grid' | 'kv-cache' | 'pipeline' | '...'   // SVG şablon anahtarı
  relatedConcepts: string[]     // kavram slugları
  relatedSolutions: string[]    // çözüm slugları
  category: 'core' | 'serving' | 'optimization' | 'hardware' | 'app'
}

export interface Flashcard {
  id: string                    // "concept:tokenization" veya "solution:vllm"
  source: 'concept' | 'solution'
  refSlug: string
  front: LocalizedText          // soru/kavram
  back: LocalizedText           // cevap/kısa açıklama
  hint?: LocalizedText
  tags: string[]
}

export type QuizQuestion =
  | { id: string; kind: 'mcq'; prompt: LocalizedText; options: LocalizedText[]; correct: number; explain: LocalizedText; tags: string[] }
  | { id: string; kind: 'truefalse'; prompt: LocalizedText; correct: boolean; explain: LocalizedText; tags: string[] }
  | { id: string; kind: 'match'; prompt: LocalizedText; pairs: { left: LocalizedText; right: LocalizedText }[]; tags: string[] }

export interface Lesson {
  slug: string
  title: LocalizedText
  summary: LocalizedText
  level: 'starter' | 'intermediate'
  durationMin: number
  steps: {
    title: LocalizedText
    body: LocalizedText
    visual?: string             // SVG anahtarı
    codeBlock?: { lang: string; code: string }
    tryIt?: string              // dış kaynak URL veya "yok"
  }[]
  relatedConcepts: string[]
  relatedSolutions: string[]
}

export interface ProgressState {
  cards: Record<string, { ef: number; interval: number; due: string; reps: number; lapses: number }>
  quizStats: { totalAnswered: number; correctRate: number; byTag: Record<string, { c: number; t: number }> }
  streak: { current: number; longest: number; lastDay: string }
  favorites: { concepts: string[]; solutions: string[] }
  readConcepts: string[]
  completedLessons: string[]
}
```

**SM-2 algoritması (özet):** Her kart `ef` (easiness factor 1.3–2.5), `interval` (gün), `due` (tarih) ile takip edilir. Kalite 0–5: <3 = tekrar, ≥3 = bir sonraki aralık `interval × ef`. İlk tekrar 1 gün, sonra 6 gün, sonra `interval × ef`.

**localStorage anahtarları:** `atlas.learn.v1.progress` (tüm state), `atlas.learn.v1.schema` (versiyon, geri dönüş için).

---

## 4. İçerik üretim listesi

### 4.1 Kavram Sözlüğü (30 kavram)

**Core (8):** tokenization, context window, attention, prompt, embedding, temperature, top-p, system prompt
**Serving (6):** KV cache, batching, streaming, PagedAttention, speculative decoding, prefill/decode
**Optimization (6):** quantization, distillation, LoRA, fine-tuning, RLHF, pruning
**Hardware (5):** CUDA, NPU, Apple Silicon unified memory, WebGPU, ONNX
**App (5):** RAG, function calling, agent, vector DB, OpenAI-compatible API

**Her kavram için:** 1 cümle özet + günlük dil (metafor) + teknik detay + ileri seviye + 1 SVG görsel + 2-3 ilişkili kavram + 2-3 ilişkili çözüm.

### 4.2 Flashcard (≈ 120 kart)
- 30 kavram × 2 kart = 60 (tanım + "şu çözüm hangi kavramı kullanır")
- 31 çözüm × 2 kart = 62 (rol + "ideal kullanım senaryosu")
- Toplam: ~120 kart

### 4.3 Quiz (≈ 90 soru)
- Kavram quiz: 30 soru (kavram → tanım eşleştirme)
- Çözüm quiz: 30 soru (özellik → çözüm eşleştirme)
- Karar quiz: 20 soru ("şu senaryo için hangi katman/çözüm?")
- Efsane/gerçek: 10 soru (yaygın yanlış inanışlar)

### 4.4 Mini-Dersler (6 adet, 5-8 adım)
1. **"Mac'te ilk LLM'ini çalıştır"** — Ollama/LM Studio, 5 adım
2. **"Üretim API'si kur"** — vLLM + OpenAI uyumlu, 6 adım
3. **"Bir modeli nicemle"** — GGUF/AWQ, 6 adım
4. **"RAG pipeline'ını birleştir"** — Embedding + Vector DB + LLM, 7 adım
5. **"Tarayıcıda LLM çalıştır"** — WebLLM/WebGPU, 5 adım
6. **"GPU karşılaştırması"** — Apple Silicon vs NVIDIA vs NPU, 6 adım

---

## 5. Uygulama aşamaları

### Aşama 1 — İskelet (ana iş parçacığı, ~1-2 tur)
1. `src/types/learning.ts` tip tanımları
2. `src/features/learning/sm2.ts` — SM-2 saf fonksiyon + birim testi
3. `src/features/learning/progress.ts` — localStorage adapter (SSR-safe, şema versiyonlu)
4. `src/i18n/learn-copy.ts` — yeni çeviriler (TR/EN)
5. `src/pages/LearnHomePage.tsx` + nav entegrasyonu
6. `src/components/StreakBadge.tsx`, `ProgressRing.tsx`
7. Boş `concepts.ts`, `flashcards.ts`, `quizzes.ts`, `lessons.ts` (tipli, boş dizi)
8. Build + test geçişi doğrula

### Aşama 2 — Worker A: Kavramlar 1-15 (paralel)
- concepts.ts ilk 15 kavram (Core + Serving + Optimization)
- Her kavram için SVG şablonu (veya yeniden kullanılabilir şablon)
- 30 ilişkili flashcard (15 kavram × 2)

### Aşama 3 — Worker B: Kavramlar 16-30 + Çözümler (paralel)
- concepts.ts kalan 15 kavram (Hardware + App)
- 62 çözüm flashcardı (31 çözüm × 2)
- 60 quiz sorusu (kavram + çözüm)

### Aşama 4 — Worker C: Quiz + Mini-Dersler (paralel)
- 30 karar + efsane quiz sorusu
- 6 mini-ders (her biri 5-8 adım, görsel + kod bloğu)
- `LessonsPage.tsx`, `LessonStepper.tsx`

### Aşama 5 — UI polish + test (ana iş parçacığı)
- FlashcardDeck, QuizQuestion, ConceptCard bileşenleri
- Çözüm sayfasına "bu çözümü öğren" bölümü
- Kavram sayfası görsel + 3 sekme
- Smoke test (vitest) ve build doğrulama
- README güncelleme

---

## 6. Doğrulama

**Kabul kriterleri:**
- `npm run check` (validate:data + test + lint + typecheck + build) yeşil
- `npm run test:e2e` mevcut + 2 yeni (flashcard akışı, quiz akışı) yeşil
- 30 kavram, ~120 flashcard, ~90 quiz, 6 mini-ders veri dosyalarında eksiksiz
- TR/EN her sayfada eksiksiz çeviri
- localStorage'a yazma/okuma tarayıcı kapat-aç sonrası korunuyor
- Atlas sayfaları görsel/işlevsel olarak değişmemiş
- Lighthouse mobile accessibility ≥ 90

**İçerik QA:**
- Her kavram 3 seviye farklı derinlikte (kopya değil)
- Her flashcard tek bir bilgi taşıyor (öğrenilebilir)
- Her quiz'in `explain` alanı öğretici (sadece "doğru" değil)
- Her mini-ders bağımsız çalıştırılabilir (gerekli araçlar listeli)

---

## 7. Açık sorular / varsayımlar

- **Varsayım:** SVG görseller inline component olarak yazılır, dış bağımlılık yok (performans + bundle)
- **Varsayım:** Mini-ders "kod bloğu" alanları kopyalanabilir `<pre>` olarak gösterilir, çalıştırma yok
- **Açık:** Kavram görsellerinde renk paleti (Atlas mavi/yeşil paleti) veya yeni renkler mi? → Atlas paleti (tutarlılık)
- **Açık:** Quiz'de "şu kadar doğru yaptın" sonrası paylaşım butonu olsun mu? → MVP'de yok, sonra eklenebilir

---

## 8. Sonraki adım

Aşama 1'i (iskelet + SM-2 + localStorage + 4 sayfa taslağı) başlatıyorum. Aşama 1 bittiğinde build + test geçişi sağlanır, sonra paralel worker'lar ile içerik üretimine geçilir.
