import { expect, beforeEach } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-comment-on-answer-repository.js'
import { makeAnswerComment } from 'test/factories/make-answer-comment.js'
import { FetchAnswerCommentUseCase } from './fetch-answer-comments.js'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentUseCase
describe('Fetch Answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comment', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('quesiton-1'),
      }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('quesiton-1'),
      }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityId('quesiton-1'),
      }),
    )

    const result = await sut.execute({
      answerId: 'quesiton-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('quesiton-1'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'quesiton-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
