import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonEntityRepository: Repository<LessonEntity>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const data = await this.lessonEntityRepository.create({
      ...createLessonDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await this.entityManager.save(data);
  }

  async findAll() {
    return await this.lessonEntityRepository.find({ relations: ['words'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
