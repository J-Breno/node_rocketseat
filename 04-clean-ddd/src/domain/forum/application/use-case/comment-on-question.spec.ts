import { expect, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-question-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-comment-on-question-repository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual(
      'Comentário teste',
    )
  })
})
