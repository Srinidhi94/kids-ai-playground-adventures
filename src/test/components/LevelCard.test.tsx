import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { LevelCard } from '@/components/LevelCard'
import { Level } from '@/types/Level'

const mockLevel: Level = {
  id: 1,
  title: 'Test Level',
  description: 'Test description',
  icon: '🧩',
  difficulty: 'easy',
  estimatedTime: 10,
  concept: 'Test concept',
  gameType: 'pattern',
  steps: [
    {
      id: 1,
      type: 'intro',
      title: 'Introduction',
      content: 'Welcome to the test level',
    },
  ],
}

describe('LevelCard', () => {
  it('renders level information correctly', () => {
    const mockOnPlay = vi.fn()

    const { getByText } = render(
      <LevelCard
        level={mockLevel}
        isCompleted={false}
        onPlay={mockOnPlay}
      />
    )

    expect(getByText('Test Level')).toBeInTheDocument()
    expect(getByText('Test description')).toBeInTheDocument()
    expect(getByText('🧩')).toBeInTheDocument()
    expect(getByText('easy')).toBeInTheDocument()
    expect(getByText('Start')).toBeInTheDocument()
  })

  it('shows completed state when level is completed', () => {
    const mockOnPlay = vi.fn()

    const { getByText } = render(
      <LevelCard
        level={mockLevel}
        isCompleted={true}
        onPlay={mockOnPlay}
      />
    )

    expect(getByText('Replay')).toBeInTheDocument()
  })

  it('calls onPlay when button is clicked', async () => {
    const user = userEvent.setup()
    const mockOnPlay = vi.fn()

    const { getByText } = render(
      <LevelCard
        level={mockLevel}
        isCompleted={false}
        onPlay={mockOnPlay}
      />
    )

    await user.click(getByText('Start'))
    expect(mockOnPlay).toHaveBeenCalled()
  })
})