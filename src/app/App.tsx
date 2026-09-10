import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/AppShell'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const ComparePage = lazy(() => import('@/pages/ComparePage').then((module) => ({ default: module.ComparePage })))
const ConceptPage = lazy(() => import('@/pages/ConceptPage').then((module) => ({ default: module.ConceptPage })))
const ConceptsPage = lazy(() => import('@/pages/ConceptsPage').then((module) => ({ default: module.ConceptsPage })))
const ExplorePage = lazy(() => import('@/pages/ExplorePage').then((module) => ({ default: module.ExplorePage })))
const FlashcardsPage = lazy(() => import('@/pages/FlashcardsPage').then((module) => ({ default: module.FlashcardsPage })))
const GuidePage = lazy(() => import('@/pages/GuidePage').then((module) => ({ default: module.GuidePage })))
const LearnHomePage = lazy(() => import('@/pages/LearnHomePage').then((module) => ({ default: module.LearnHomePage })))
const LearnPage = lazy(() => import('@/pages/LearnPage').then((module) => ({ default: module.LearnPage })))
const LessonsPage = lazy(() => import('@/pages/LessonsPage').then((module) => ({ default: module.LessonsPage })))
const MethodologyPage = lazy(() => import('@/pages/MethodologyPage').then((module) => ({ default: module.MethodologyPage })))
const QuizPage = lazy(() => import('@/pages/QuizPage').then((module) => ({ default: module.QuizPage })))
const SolutionPage = lazy(() => import('@/pages/SolutionPage').then((module) => ({ default: module.SolutionPage })))

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
