import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { App } from './App'

it('renders the Turkish atlas shell', () => {
  render(<App />, { wrapper: MemoryRouter })
  expect(screen.getByRole('banner')).toHaveTextContent('LLM / ATLAS')
  expect(screen.getByRole('main')).toHaveTextContent('Doğru modeli')
})
