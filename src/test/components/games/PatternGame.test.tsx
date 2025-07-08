import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { PatternGame } from '@/components/games/PatternGame'
import { GameStep } from '@/types/Level'

const mockQuestionStep: GameStep = {
  id: 1,
  type: 'quiz',
  title: 'Test Question',
  content: 'Which option is correct?',
  options: ['Option A', 'Option B', 'Option C', 'Option D'],
  correctAnswer: 1,
  explanation: 'Option B is correct because...',
}

const mockIntroStep: GameStep = {
  id: 2,
  type: 'intro',
  title: 'Welcome',
  content: 'Welcome to the game!',
}

describe('PatternGame', () => {
  it('renders intro step correctly', () => {
    const mockOnStepComplete = vi.fn()

    const { getByText } = render(
      <PatternGame
        step={mockIntroStep}
        onStepComplete={mockOnStepComplete}
      />
    )

    expect(getByText('Welcome')).toBeInTheDocument()
    expect(getByText('Welcome to the game!')).toBeInTheDocument()
    expect(getByText('Continue Adventure! 🚀')).toBeInTheDocument()
  })

  it('renders quiz step with options', () => {
    const mockOnStepComplete = vi.fn()

    const { getByText } = render(
      <PatternGame
        step={mockQuestionStep}
        onStepComplete={mockOnStepComplete}
      />
    )

    expect(getByText('Test Question')).toBeInTheDocument()
    expect(getByText('Which option is correct?')).toBeInTheDocument()
    expect(getByText('A.')).toBeInTheDocument()
    expect(getByText('Option A')).toBeInTheDocument()
  })

  it('handles answer selection correctly', async () => {
    const user = userEvent.setup()
    const mockOnStepComplete = vi.fn()

    const { getByText } = render(
      <PatternGame
        step={mockQuestionStep}
        onStepComplete={mockOnStepComplete}
      />
    )

    // Click on option B (correct answer)
    const optionB = getByText('Option B').closest('button')!
    await user.click(optionB)

    // Should show explanation
    expect(getByText('Perfect! You got it!')).toBeInTheDocument()
    expect(getByText('Option B is correct because...')).toBeInTheDocument()
    expect(getByText('Continue')).toBeInTheDocument()
  })

  it('handles incorrect answer', async () => {
    const user = userEvent.setup()
    const mockOnStepComplete = vi.fn()

    const { getByText } = render(
      <PatternGame
        step={mockQuestionStep}
        onStepComplete={mockOnStepComplete}
      />
    )

    // Click on option A (incorrect answer)
    const optionA = getByText('Option A').closest('button')!
    await user.click(optionA)

    // Should show encouraging message
    expect(getByText("Great thinking! Let's learn together!")).toBeInTheDocument()
    expect(getByText('Option B is correct because...')).toBeInTheDocument()
  })

  it('calls onStepComplete when continue is clicked', async () => {
    const user = userEvent.setup()
    const mockOnStepComplete = vi.fn()

    const { getByText } = render(
      <PatternGame
        step={mockQuestionStep}
        onStepComplete={mockOnStepComplete}
      />
    )

    // Answer and continue
    const optionB = getByText('Option B').closest('button')!
    await user.click(optionB)
    await user.click(getByText('Continue'))

    expect(mockOnStepComplete).toHaveBeenCalledWith(100)
  })
})