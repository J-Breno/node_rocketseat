import { expect, beforeEach } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase
describe('Get question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value?.quesiton.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
