import type { Question } from '../../enterprise/entities/question.js'
import type { AnswerRepository } from '../repositories/answers-repository.js'
import type { QuestionRepository } from '../repositories/questions-repository.js'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
