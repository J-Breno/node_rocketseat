import { expect, beforeEach } from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-comment-on-answer-repository.js'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentRepository.items[0]?.content).toEqual(
      'Comentário teste',
    )
  })
})
