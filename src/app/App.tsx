import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/AppShell'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { ComparePage } from '@/pages/ComparePage'
import { ConceptPage } from '@/pages/ConceptPage'
import { ConceptsPage } from '@/pages/ConceptsPage'
import { ExplorePage } from '@/pages/ExplorePage'
import { FlashcardsPage } from '@/pages/FlashcardsPage'
import { GuidePage } from '@/pages/GuidePage'
import { HomePage } from '@/pages/HomePage'
import { LearnHomePage } from '@/pages/LearnHomePage'
import { LearnPage } from '@/pages/LearnPage'
import { LessonsPage } from '@/pages/LessonsPage'
import { MethodologyPage } from '@/pages/MethodologyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { QuizPage } from '@/pages/QuizPage'
import { SolutionPage } from '@/pages/SolutionPage'

export function App() {
  return <ThemeProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/tr" replace />} />
      <Route path="/:locale" element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="learn" element={<LearnHomePage />} />
        <Route path="learn/intro" element={<LearnPage />} />
        <Route path="learn/concepts" element={<ConceptsPage />} />
        <Route path="learn/concepts/:slug" element={<ConceptPage />} />
        <Route path="learn/flashcards" element={<FlashcardsPage />} />
        <Route path="learn/quiz" element={<QuizPage />} />
        <Route path="learn/lessons" element={<LessonsPage />} />
        <Route path="learn/lessons/:slug" element={<LessonsPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="solutions/:slug" element={<SolutionPage />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="methodology" element={<MethodologyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/tr" replace />} />
    </Routes>
  </ThemeProvider>
}
