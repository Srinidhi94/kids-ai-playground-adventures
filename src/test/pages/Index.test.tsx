import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock the levels data
vi.mock('@/data/levels', () => ({
  levels: [
    {
      id: 1,
      title: 'Pattern Detective',
      description: 'Learn to spot patterns like AI does',
      icon: '🕵️',
      difficulty: 'Beginner',
      gameType: 'pattern',
      steps: [],
    },
  ],
}))

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Dashboard Page', () => {
  it('renders the main title', () => {
    const { getByText } = renderWithProviders(<Dashboard />)
    
    expect(getByText('Future Minds AI')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    const { getByText } = renderWithProviders(<Dashboard />)
    
    expect(getByText('Master AI concepts through interactive games and challenges')).toBeInTheDocument()
  })

  it('renders level cards', () => {
    const { getByText } = renderWithProviders(<Dashboard />)
    
    expect(getByText('Pattern Detective')).toBeInTheDocument()
    expect(getByText('Learn to spot patterns like AI does')).toBeInTheDocument()
  })
})