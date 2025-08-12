import { Entity } from "../../core/entities/entity.js"
import type { UniqueEntityId } from "../../core/entities/unique-entity-id.js"

interface AnswerProps {
    content: string
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    createdAt: Date
    updatedAt?: Date 
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content
    }
}