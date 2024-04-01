import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educator } from '../educator/entity/educator.entity';
import { Student } from './entity/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([Student, Educator])],
    controllers: [StudentController],
    providers: [StudentService]
})
export class StudentModule {}
