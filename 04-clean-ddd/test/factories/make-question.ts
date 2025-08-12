import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example Question',
    slug: Slug.create('example-question'),
    authorId: new UniqueEntityId(),
    content: 'Example content',
    ...override,
  })
  return question
}
