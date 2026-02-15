/**
 * Интерактивные вопросы для страницы /path
 */

export interface QuestionOption {
  text: string
  correct: boolean
}

export interface Question {
  id: number
  text: string
  options: QuestionOption[]
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Какая игра для него — история?',
    options: [
      { text: 'Ведьмак 3', correct: true },
      { text: 'Dota 2', correct: false },
      { text: 'Cyberpunk 2077', correct: false },
    ],
  },
  {
    id: 2,
    text: 'В какой игре он провёл больше всего часов?',
    options: [
      { text: 'Dota 2', correct: true },
      { text: 'Ведьмак 3', correct: false },
      { text: 'Другое', correct: false },
    ],
  },
  {
    id: 3,
    text: 'Что для него дом?',
    options: [
      { text: 'Место', correct: false },
      { text: 'Люди', correct: false },
      { text: 'Место, где ждут и поддержат', correct: true },
    ],
  },
  {
    id: 4,
    text: 'С чем у него ассоциируешься ты?',
    options: [
      { text: 'Котёнок · Кролик · Такса', correct: true },
      { text: 'Бегемот · Панда · Медвежонок', correct: false },
      { text: 'Львица · Тигрица · Пума', correct: false },
    ],
  },
  {
    id: 5,
    text: 'Когда ему было особенно трудно, кто был рядом?',
    options: [
      { text: 'Он справился сам', correct: false },
      { text: 'Друзья', correct: false },
      { text: 'Ты', correct: true },
    ],
  },
]
