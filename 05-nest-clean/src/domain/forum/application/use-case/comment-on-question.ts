import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { QuestionRepository } from '../repositories/questions-repository.js'
import { QuestionComment } from '../../enterprise/entities/question-comments.js'
import type { QuestionCommentRepository } from '../repositories/question-comments-repository.js'
import { left, right, type Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentRepository.create(questionComment)
    return right({ questionComment })
  }
}
