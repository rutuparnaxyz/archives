import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../student/entity/student.entity';
import { EducatorController } from './educator.controller';
import { EducatorService } from './educator.service';
import { Educator } from './entity/educator.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Educator, Student])],
    controllers: [EducatorController],
    providers: [EducatorService]
})
export class EducatorModule {}
