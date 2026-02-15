'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Section, Container } from '@/components/layout'
import { Text, Button } from '@/components/ui'
import { AmbientLight, GlassCard } from '@/components/effects'
import { QuestionCard } from '@/components/interactive/QuestionCard'
import { QUESTIONS } from '@/shared/config/questions'
import { PATH_TEXT } from '@/content/text'
import { useScrollReveal } from '@/shared/hooks'

export default function PathPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const { elementRef: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLDivElement>()
  const { elementRef: feedbackRef, isVisible: feedbackVisible } = useScrollReveal<HTMLDivElement>()

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
      } else {
        setIsComplete(true)
      }
    }, 1500)
  }

  const currentQuestion = QUESTIONS[currentQuestionIndex]

  return (
    <main className="relative min-h-screen bg-bg-primary">
      <AmbientLight />

      <Section spacing="lg" className="relative z-10">
        <Container size="md">
          {/* Header */}
          <div
            ref={titleRef}
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Text
              variant="display"
              as="h1"
              className="mb-4 drop-shadow-[0_0_30px_rgba(245,245,247,0.3)]"
            >
              {PATH_TEXT.title}
            </Text>
            <Text variant="body" className="text-text-muted">
              {PATH_TEXT.subtitle}
            </Text>
          </div>

          {/* Progress */}
          {!isComplete && (
            <div className="mb-12">
              <div className="flex gap-3 justify-center">
                {QUESTIONS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index < currentQuestionIndex
                        ? 'w-8 bg-accent-rose shadow-[0_0_10px_rgba(242,161,179,0.5)]'
                        : index === currentQuestionIndex
                        ? 'w-12 bg-accent-soft shadow-[0_0_15px_rgba(247,203,214,0.6)] animate-pulse'
                        : 'w-8 bg-bg-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Question */}
          {!isComplete && (
            <QuestionCard
              key={currentQuestionIndex}
              question={currentQuestion}
              index={currentQuestionIndex}
              onAnswer={handleAnswer}
            />
          )}

          {/* Complete */}
          {isComplete && (
            <div
              ref={feedbackRef}
              className={`text-center space-y-8 transition-all duration-1000 ${
                feedbackVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <GlassCard intensity="medium" className="p-8 md:p-12">
                <Text
                  variant="display"
                  as="h2"
                  className="text-accent-rose mb-6 drop-shadow-[0_0_30px_rgba(242,161,179,0.6)]"
                >
                  {PATH_TEXT.completeFeedback}
                </Text>
                <Text variant="body" className="text-text-muted mb-8">
                  Правильных ответов: {correctAnswers} из {QUESTIONS.length}
                </Text>

                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/us">
                    <Button variant="ghost" size="md">
                      Назад
                    </Button>
                  </Link>
                  <Link href="/final">
                    <Button variant="primary" size="md">
                      Завершить
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </div>
          )}
        </Container>
      </Section>
    </main>
  )
}
