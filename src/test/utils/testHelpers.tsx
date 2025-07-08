import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          {ui}
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export const createMockLevel = (overrides = {}) => ({
  id: 1,
  title: 'Test Level',
  description: 'Test description',
  icon: '🧩',
  difficulty: 'Beginner' as const,
  gameType: 'pattern' as const,
  steps: [],
  ...overrides,
})

export const createMockUserProgress = (overrides = {}) => ({
  id: 'test-id',
  user_id: 'user-id',
  level_id: 1,
  score: 100,
  completed_at: new Date().toISOString(),
  ...overrides,
})