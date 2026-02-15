'use client'

import { useState, useEffect, useRef } from 'react'
import { Text } from '@/components/ui'
import { Question } from '@/shared/config/questions'
import {
  animateCorrectAnswer,
  animateIncorrectAnswer,
  animateQuestionAppear,
} from '@/shared/animations'

interface QuestionCardProps {
  question: Question
  index: number
  onAnswer: (correct: boolean) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, index, onAnswer }) => {
  const [answered, setAnswered] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (cardRef.current) {
      animateQuestionAppear(cardRef.current, index)
    }
  }, [index])

  const handleOptionClick = (optionIndex: number) => {
    if (answered) return

    setAnswered(true)
    setSelectedIndex(optionIndex)

    const option = question.options[optionIndex]
    const element = optionRefs.current[optionIndex]

    if (element) {
      if (option.correct) {
        animateCorrectAnswer(element)
      } else {
        animateIncorrectAnswer(element)
      }
    }

    setTimeout(() => {
      onAnswer(option.correct)
    }, 1000)
  }

  return (
    <div ref={cardRef} className="space-y-6">
      <Text variant="heading" as="h3" className="text-center">
        {question.text}
      </Text>

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            ref={(el) => {
              optionRefs.current[optionIndex] = el
            }}
            onClick={() => handleOptionClick(optionIndex)}
            disabled={answered}
            className={`
              w-full px-6 py-4 rounded-lg border transition-all duration-300
              ${
                answered && selectedIndex === optionIndex
                  ? option.correct
                    ? 'border-accent-rose bg-accent-rose text-bg-primary'
                    : 'border-text-muted bg-transparent text-text-muted opacity-50'
                  : 'border-text-muted bg-transparent text-text-primary hover:border-accent-soft'
              }
              ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}
              min-h-[var(--touch-target-min)]
            `}
          >
            <Text variant="body">{option.text}</Text>
          </button>
        ))}
      </div>
    </div>
  )
}
