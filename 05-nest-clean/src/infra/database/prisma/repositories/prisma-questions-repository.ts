import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
    constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
        where: {
            id,
        }
    })

    if(!question) {
        return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  create(question: Question): Promise<void> {
    
  }

  findBySlug(slug: string): Promise<Question | null> {
    
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    
  }

  delete(question: Question): Promise<void> {
    
  }

  save(question: Question): Promise<void> {
    
  }
}
