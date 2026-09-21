import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from './App'

const renderAt = async (path: string) => {
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
  await screen.findByRole('heading', { level: 1 }, { timeout: 5000 })
}

describe('atlas routes', async () => {
  it('renders the complete English home entry', async () => {
    await renderAt('/en')
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(document.title).toBe('LLM Atlas — Runtime & Serving Field Guide')
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', 'Compare 31 LLM runtime and serving solutions across seven architectural layers using official sources.')
    expect(screen.getByText('SOURCE ENDPOINT REVIEW · 2026-09-21')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not one market')
    expect(screen.getByRole('link', { name: 'Open the selection guide' })).toHaveAttribute('href', '/en/guide')
    expect(within(screen.getByRole('navigation')).getAllByRole('link', { name: 'Learn' })).toHaveLength(1)
    expect(screen.getAllByText(/INF/).length).toBeGreaterThan(0)
  })

  it('expands an architectural layer and links to its filtered explorer', async () => {
    const user = userEvent.setup()
    await renderAt('/tr')

    const servingLayer = screen.getByRole('button', { name: /SRV · Model Sunucuları ve Servis Çerçeveleri/ })
    expect(servingLayer).toHaveAttribute('aria-expanded', 'false')

    await user.click(servingLayer)

    expect(servingLayer).toHaveAttribute('aria-expanded', 'true')
    const details = screen.getByRole('region', { name: 'Model Sunucuları ve Servis Çerçeveleri' })
    expect(within(details).getByText(/İstek zamanlama, batching, streaming/)).toBeInTheDocument()
    expect(within(details).getByRole('link', { name: 'Bu katmanı keşfet' })).toHaveAttribute('href', '/tr/explore?category=SRV')
  })

  it('filters the explorer from URL state and adds a comparison', async () => {
    const user = userEvent.setup()
    await renderAt('/en/explore?category=INF')
    expect(screen.getByText('8 results')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'TensorRT-LLM' }).length).toBeGreaterThan(0)
    expect(screen.queryAllByRole('link', { name: 'vLLM' })).toHaveLength(0)
    await user.click(screen.getAllByRole('checkbox', { name: 'Compare TensorRT-LLM' }).at(0)!)
    expect(screen.getByText('1 solution selected')).toBeInTheDocument()
  })

  it('keeps observer dates visible when showing capability differences only', async () => {
    const user = userEvent.setup()
    await renderAt('/en/compare?compare=llama-cpp,mlx-lm')
    await user.click(screen.getByRole('checkbox', { name: 'Show differences only' }))
    expect(screen.getByRole('rowheader', { name: 'Last verified' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'Project status' })).toBeInTheDocument()
    expect(screen.queryByRole('rowheader', { name: 'License' })).not.toBeInTheDocument()
  })

  it('warns about cross-layer comparisons', async () => {
    await renderAt('/en/compare?compare=tensorrt-llm,ollama')
    expect(screen.getByRole('alert')).toHaveTextContent('different architectural layers')
    expect(screen.getByText('Execution backend')).toBeInTheDocument()
  })

  it('describes the differences-only control as a filter', async () => {
    await renderAt('/tr/compare?compare=tensorrt-llm,llama-cpp')
    expect(screen.getByRole('checkbox', { name: 'Yalnızca farklılıkları göster' })).toBeInTheDocument()
  })

  it('localizes Turkish compatibility values and source types', async () => {
    await renderAt('/tr/solutions/llama-cpp')
    expect(screen.getByText('Yerel · Masaüstü · Uç · Sunucu')).toBeInTheDocument()
    expect(screen.getByText(/Resmî proje deposu/)).toBeInTheDocument()
    expect(screen.queryByText(/official-repository/)).not.toBeInTheDocument()
  })

  it('uses natural Turkish labels throughout the learning hub', async () => {
    await renderAt('/tr/learn')
    expect(screen.getByRole('heading', { name: 'Test' })).toBeInTheDocument()
    expect(screen.getByText('Aralıklı tekrar ile her gün küçük bir set tekrar et.')).toBeInTheDocument()
    expect(screen.getByText('Hızlı ve rastgele')).toBeInTheDocument()
    expect(screen.getByText('4–7 adımlı, görsel mini dersler.')).toBeInTheDocument()
  })

  it('shows archived projects with a clear historical-context notice', async () => {
    await renderAt('/tr/solutions/hugging-face-tgi')
    expect(screen.getByText('Arşivlendi')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent('salt okunur')
  })

  it('renders a source-backed solution profile', async () => {
    await renderAt('/en/solutions/vllm')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('vLLM')
    expect(screen.getByText('What it does')).toBeInTheDocument()
    expect(screen.getByText('WHERE IN THE STACK')).toBeInTheDocument()
    expect(screen.getByText('The CPU and GPU types this tool can run the model on.')).toBeInTheDocument()
    const vllmReleaseLink = screen.getByRole('link', { name: /vLLM v0\.29\.0 Release Notes/ })
    expect(vllmReleaseLink).toHaveAttribute('href', 'https://github.com/vllm-project/vllm/releases/tag/v0.29.0')
    expect(vllmReleaseLink).toHaveAttribute('target', '_blank')
  })

  it('explains methodology without a universal ranking', async () => {
    await renderAt('/en/methodology')
    expect(screen.getByText('TTFT')).toBeInTheDocument()
    expect(screen.getByText('How long until you hear the first word.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Why there is no universal speed ranking/ })).toBeInTheDocument()
  })

  it('starts the five-question selection guide', async () => {
    await renderAt('/en/guide')
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apple Silicon' })).toBeInTheDocument()
  })

  it('explains the seven layers with analogies on the learn intro page', async () => {
    await renderAt('/en/learn/intro')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Understand the LLM world')
    expect(screen.getByText('Seven layers, seven different jobs')).toBeInTheDocument()
    expect(screen.getByText('Mini glossary')).toBeInTheDocument()
    expect(screen.getByText('TTFT')).toBeInTheDocument()
    expect(screen.getByText('KV Cache')).toBeInTheDocument()
  })
})
