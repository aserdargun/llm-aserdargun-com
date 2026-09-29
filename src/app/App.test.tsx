import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { App } from './App'

// The assertions below cover the Turkish shell, so the route is named instead of
// relying on wherever the entry point happens to send a visitor today.
it('renders the Turkish atlas shell', () => {
  render(<App />, { wrapper: ({ children }) => <MemoryRouter initialEntries={['/tr']}>{children}</MemoryRouter> })
  expect(screen.getByRole('banner')).toHaveTextContent('LLM / ATLAS')
  expect(screen.getByRole('main')).toHaveTextContent('Tek pazar değil')
})

it('sends the entry route to the English shell', () => {
  render(<App />, { wrapper: MemoryRouter })
  expect(screen.getByRole('main')).not.toHaveTextContent('Tek pazar değil')
})
