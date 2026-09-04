const t = (tr: string, en: string) => ({ tr, en })

export const learnNav = {
  hub: t('Öğren', 'Learn'),
  concepts: t('Kavramlar', 'Concepts'),
  flashcards: t('Kartlar', 'Flashcards'),
  quiz: t('Test', 'Quiz'),
  lessons: t('Dersler', 'Lessons'),
}

export const learnHome = {
  title: t('Kalıcı öğrenme atlası', 'A durable learning atlas'),
  intro: t(
    '31 çözüm ve 7 mimari katmanın üstünde, kavramları günlük dille açıklayan, kartlarla tekrar ettiren ve mini-derslerle pekiştiren öğrenme katmanı.',
    'A learning layer on top of 31 solutions and 7 architectural layers: concepts explained in plain language, spaced-repetition cards, scenario mini-lessons.',
  ),
  ctaConcepts: t('Kavramlara başla', 'Start with concepts'),
  ctaCards: t('Bugünkü tekrar', 'Today’s review'),
  ctaQuiz: t('Hızlı test', 'Quick quiz'),
  ctaLessons: t('Mini-ders', 'Mini-lesson'),
  stats: {
    streak: t('Günlük seri', 'Day streak'),
    longest: t('En uzun seri', 'Longest streak'),
    cards: t('Gözden geçirilen kart', 'Cards reviewed'),
    concepts: t('Okunan kavram', 'Concepts read'),
    lessons: t('Tamamlanan ders', 'Lessons done'),
    quizzes: t('Cevaplanan soru', 'Questions answered'),
  },
  empty: {
    title: t('Henüz bir ilerleme yok', 'No progress yet'),
    body: t('İlk kavramı okuyarak veya ilk kartı gözden geçirerek başla. Tüm ilerlemen cihazında saklanır; hesap gerekmez.', 'Start by reading your first concept or reviewing your first card. Everything stays on your device; no account is required.'),
  },
}

export const learnCommon = {
  level: t('Seviye', 'Level'),
  beginner: t('Günlük dil', 'Plain language'),
  intermediate: t('Teknik detay', 'Technical detail'),
  advanced: t('İleri seviye', 'Advanced'),
  next: t('İleri', 'Next'),
  back: t('Geri', 'Back'),
  done: t('Tamam', 'Done'),
  skip: t('Atla', 'Skip'),
  tryIt: t('Bunu dene', 'Try it'),
  copy: t('Kodu kopyala', 'Copy code'),
  copied: t('Kopyalandı', 'Copied'),
  minutes: t('dk', 'min'),
  start: t('Başla', 'Start'),
  continue: t('Devam et', 'Continue'),
  restart: t('Yeniden başla', 'Restart'),
  showAnswer: t('Cevabı göster', 'Show answer'),
  rateEasy: t('Kolaydı', 'Easy'),
  rateHard: t('Zordu', 'Hard'),
  rateAgain: t('Tekrar', 'Again'),
  correct: t('Doğru', 'Correct'),
  wrong: t('Yanlış', 'Wrong'),
  matched: t('Eşleştirildi', 'Matched'),
  noCards: t('Bugün tekrar edilecek kart yok. Yeni kartlar ekleniyor.', 'No cards due today. New cards are being added gradually.'),
  noQuiz: t('Bu kategoride henüz soru yok.', 'No questions in this category yet.'),
  noLessons: t('Henüz mini-ders eklenmedi.', 'No mini-lessons yet.'),
  noConcepts: t('Henüz kavram eklenmedi.', 'No concepts yet.'),
  results: t('Sonuçlar', 'Results'),
  of: t('/', 'of'),
}

export const learnCards = {
  title: t('Kartlar', 'Flashcards'),
  intro: t(
    'Bir kavramı ya da çözümü gördüğünde cevabı hatırlamaya çalış, sonra çevir. Kolay/tekrar değerlendirmen tekrar zamanını ayarlar.',
    'Try to recall the answer before flipping. Your ease/again rating schedules the next review.',
  ),
  session: t('Oturum', 'Session'),
  sessionDone: t('Oturum tamamlandı', 'Session complete'),
  nextDue: t('Sonraki tekrar', 'Next due'),
  cardCount: t('kart', 'cards'),
}

export const learnQuiz = {
  title: t('Test', 'Quiz'),
  intro: t(
    'Bilgini sınayan kısa sorular. Hata yaptığında açıklama gösterilir; her etiket ayrı takip edilir.',
    'Short questions to check your understanding. Mistakes come with an explanation; every tag is tracked separately.',
  ),
  filter: t('Kategori', 'Category'),
  filterAll: t('Tümü', 'All'),
  resultsTitle: t('Sonuç', 'Result'),
  scoreLabel: t('Puan', 'Score'),
  passThreshold: 0.7,
}

export const learnLessons = {
  title: t('Mini-dersler', 'Mini-lessons'),
  intro: t(
    '5–8 adımlı, görsel ve uygulamalı kısa dersler. Her ders bağımsız tamamlanabilir; gereken araçlar adımlarda listelenir.',
    'Short, visual, hands-on lessons with 5–8 steps. Each lesson stands alone; required tools are listed inside.',
  ),
  step: t('Adım', 'Step'),
  of: t('/', 'of'),
}

export const learnConcepts = {
  title: t('Kavramlar', 'Concepts'),
  intro: t(
    'Kavramları üç seviyede oku: günlük dil, teknik detay, ileri seviye. İstediğin seviyede başla; hazır olduğunda bir üst kata geç.',
    'Read each concept at three levels: plain language, technical detail, advanced. Start where you’re comfortable and step up when ready.',
  ),
  searchPlaceholder: t('Kavram ara…', 'Search concepts…'),
  related: t('İlgili', 'Related'),
  relatedConcepts: t('İlgili kavramlar', 'Related concepts'),
  relatedSolutions: t('İlgili çözümler', 'Related solutions'),
  markRead: t('Okundu olarak işaretle', 'Mark as read'),
  markedRead: t('Okundu', 'Read'),
}

export const learnPills = {
  core: t('Temel', 'Core'),
  serving: t('Servis', 'Serving'),
  optimization: t('Optimizasyon', 'Optimization'),
  hardware: t('Donanım', 'Hardware'),
  app: t('Uygulama', 'App'),
}
