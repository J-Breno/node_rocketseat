import { left, right, type Either } from '@/core/either.js'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student.js'
import { StudentsRepository } from '../repositories/students-repository.js'
import { HashGenerator } from '../cryptography/hash-generator.js'
import { StudentAlreadyExistsError } from './errors/student-already-exists-error.js'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student
  }
>

@Injectable()
export class RegisterStudentUseCase {
  constructor(private studentsRepository: StudentsRepository, private hashGenerator: HashGenerator) {}

  async execute({
    name,password, email,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail = await this.studentsRepository.findByEmail(email)
    
        if (studentWithSameEmail) {
          return left(new StudentAlreadyExistsError(email))
        }
    
        const hashedPassword = await this.hashGenerator.hash(password)
    
        const student = Student.create(
            {
                email, name, password
            }
        )

        await this.studentsRepository.create(student)
    
    return right({ student })
  }
}
