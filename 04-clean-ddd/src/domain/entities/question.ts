import { randomUUID } from "node:crypto"
import type { Slug } from "./value-objects/slug.js"

interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: string
}

export class Question {
    public id: string
    public title: string
    public slug: Slug
    public content: string
    public authorId: string

    constructor({title, content,slug, authorId}: QuestionProps, id?: string) {
        this.title = title
        this.content = content
        this.slug = slug
        this.authorId = authorId
        this.id = id ?? randomUUID()
    }
}