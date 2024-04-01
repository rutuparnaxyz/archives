import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EducatorModule } from './modules/educator/educator.module';
import { Student } from './modules/student/entity/student.entity';
import { Educator } from './modules/educator/entity/educator.entity';
import { Otp } from './modules/auth/entity/otp.entity';
import { AuthModule } from './modules/auth/auth.module';
import { StudentModule } from './modules/student/student.module';
import { Course } from './modules/course/entity/course.entity';
import { Board } from './modules/course/entity/board.entity';
import { CourseModule } from './modules/course/course.module';
import { Assignment } from './modules/class/entity/assignment.entity';
import { Attendance } from './modules/class/entity/attendance.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'dev.env',
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            host: process.env.DB_HOST,
            type: 'mysql',
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Student, Educator, Otp, Course, Board, Assignment, Attendance],
            synchronize: true
        }),
        AuthModule,
        SharedModule,
        EducatorModule,
        StudentModule,
        CourseModule
    ]
})
export class AppModule {}
