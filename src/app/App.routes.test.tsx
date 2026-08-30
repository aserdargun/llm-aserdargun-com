import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from './App'

const renderAt = (path: string) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

describe('atlas routes', () => {
  it('renders the complete English home entry', () => {
    renderAt('/en')
    expect(document.documentElement).toHaveAttribute('lang', 'en')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not one market')
    expect(screen.getByRole('link', { name: 'Open the selection guide' })).toHaveAttribute('href', '/en/guide')
    expect(within(screen.getByRole('navigation')).getAllByRole('link', { name: 'Learn' })).toHaveLength(1)
    expect(screen.getAllByText(/INF/).length).toBeGreaterThan(0)
  })

  it('expands an architectural layer and links to its filtered explorer', async () => {
    const user = userEvent.setup()
    renderAt('/tr')

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
    renderAt('/en/explore?category=INF')
    expect(screen.getByText('8 results')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'TensorRT-LLM' }).length).toBeGreaterThan(0)
    expect(screen.queryAllByRole('link', { name: 'vLLM' })).toHaveLength(0)
    await user.click(screen.getAllByRole('checkbox', { name: 'Compare TensorRT-LLM' }).at(0)!)
    expect(screen.getByText('1 solution selected')).toBeInTheDocument()
  })

  it('warns about cross-layer comparisons', () => {
    renderAt('/en/compare?compare=tensorrt-llm,ollama')
    expect(screen.getByRole('alert')).toHaveTextContent('different architectural layers')
    expect(screen.getByText('Execution backend')).toBeInTheDocument()
  })

  it('renders a source-backed solution profile', () => {
    renderAt('/en/solutions/vllm')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('vLLM')
    expect(screen.getByText('What it does')).toBeInTheDocument()
    expect(screen.getByText('WHERE IN THE STACK')).toBeInTheDocument()
    expect(screen.getByText('The CPU and GPU types this tool can run the model on.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /vLLM Documentation/ })).toHaveAttribute('target', '_blank')
  })

  it('explains methodology without a universal ranking', () => {
    renderAt('/en/methodology')
    expect(screen.getByText('TTFT')).toBeInTheDocument()
    expect(screen.getByText('How long until you hear the first word.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Why there is no universal speed ranking/ })).toBeInTheDocument()
  })

  it('starts the five-question selection guide', () => {
    renderAt('/en/guide')
    expect(screen.getByText('Question 1 of 5')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apple Silicon' })).toBeInTheDocument()
  })

  it('explains the seven layers with analogies on the learn intro page', () => {
    renderAt('/en/learn/intro')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Understand the LLM world')
    expect(screen.getByText('Seven layers, seven different jobs')).toBeInTheDocument()
    expect(screen.getByText('Mini glossary')).toBeInTheDocument()
    expect(screen.getByText('TTFT')).toBeInTheDocument()
    expect(screen.getByText('KV Cache')).toBeInTheDocument()
  })
})
