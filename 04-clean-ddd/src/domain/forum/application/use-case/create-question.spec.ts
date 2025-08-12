import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'
import type { QuestionRepository } from '../repositories/questions-repository.js'
import type { Question } from '../../enterprise/entities/question.js'
import { CreateQuestionUseCase } from './create-question.js'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova Pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
