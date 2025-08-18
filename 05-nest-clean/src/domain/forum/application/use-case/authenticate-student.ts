import { left, right, type Either } from '@/core/either.js'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/students-repository.js'
import { HashComparer } from '../cryptography/hash-compare.js'
import { Encrypter } from '../cryptography/encrypter.js'
import { WrongCredentialsError } from './errors/wrong-creadentials-error.js'

interface AuthenticateStudentUseCaseRequest {
  email: string
password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(private studentsRepository: StudentsRepository, private hashCompare: HashComparer, private encrypter: Encrypter) {}

  async execute({
    password, email,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)
    
        if (!student) {
          return left(new WrongCredentialsError())
        }
    
        const isPasswordValid = await this.hashCompare.compare(password, student.password)
        
            if (!isPasswordValid) {
                return left(new WrongCredentialsError())

            }
        
            const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() })
        return right({accessToken})
  }
}
