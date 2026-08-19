import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/AppShell'
import { ComparePage } from '@/pages/ComparePage'
import { ExplorePage } from '@/pages/ExplorePage'
import { GuidePage } from '@/pages/GuidePage'
import { HomePage } from '@/pages/HomePage'
import { LearnPage } from '@/pages/LearnPage'
import { MethodologyPage } from '@/pages/MethodologyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SolutionPage } from '@/pages/SolutionPage'

export function App() {
  return <Routes>
    <Route path="/" element={<Navigate to="/tr" replace />} />
    <Route path="/:locale" element={<AppShell />}>
      <Route index element={<HomePage />} />
      <Route path="learn" element={<LearnPage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="compare" element={<ComparePage />} />
      <Route path="solutions/:slug" element={<SolutionPage />} />
      <Route path="guide" element={<GuidePage />} />
      <Route path="methodology" element={<MethodologyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/tr" replace />} />
  </Routes>
}
