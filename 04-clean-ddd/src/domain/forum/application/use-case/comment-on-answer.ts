import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { AnswerRepository } from '../repositories/answers-repository.js'
import { AnswerComment } from '../../enterprise/entities/answer-comments.js'
import type { AnswerCommentRepository } from '../repositories/answer-comments-repository.js'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    })

    await this.answerCommentRepository.create(answerComment)
    return { answerComment }
  }
}
