import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { QuestionRepository } from '../repositories/questions-repository.js'
import { QuestionComment } from '../../enterprise/entities/question-comments.js'
import type { QuestionCommentRepository } from '../repositories/question-comments-repository.js'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

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
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.questionCommentRepository.create(questionComment)
    return { questionComment }
  }
}
