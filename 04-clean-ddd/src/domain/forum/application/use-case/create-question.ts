import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import type { QuestionRepository } from '../repositories/questions-repository.js'
import { right, type Either } from '@/core/either.js'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.js'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    content,
    title,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    })

    const questionAttachment = attachmentsIds.map((id) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(id),
        questionId: question.id,
      })
    })

    question.attachments = questionAttachment

    await this.questionRepository.create(question)

    return right({ question })
  }
}
