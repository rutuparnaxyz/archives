import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from '../class/entity/assignment.entity';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Board } from './entity/board.entity';
import { Course } from './entity/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Board, Assignment])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
