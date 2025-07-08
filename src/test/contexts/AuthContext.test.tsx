import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'

// Test component to access auth context
const TestComponent = () => {
  const { user, loading } = useAuth()
  return (
    <div>
      <div>Loading: {loading.toString()}</div>
      <div>User: {user ? 'logged in' : 'not logged in'}</div>
    </div>
  )
}

describe('AuthContext', () => {
  it('provides initial auth state', () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(getByText('Loading: true')).toBeInTheDocument()
    expect(getByText('User: not logged in')).toBeInTheDocument()
  })

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within an AuthProvider')

    consoleSpy.mockRestore()
  })
})