import { Course } from 'src/modules/course/entity/course.entity';
import { Educator } from 'src/modules/educator/entity/educator.entity';
import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Student } from 'src/modules/student/entity/student.entity';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';
import { Attendance } from './attendance.entity';

@Entity()
export class Assignment extends AbstarctEntity {

    @ManyToOne(
        type => Student,
        student => student.assignment
    )
    student: Student;

    @ManyToOne(
        type => Educator,
        educator => educator.assignment
    )
    educator: Educator;

    @ManyToOne(
        type => Course,
        course => course.assignment
    )
    course: Course;

    @OneToMany(
        type => Attendance,
        attendance => attendance.assignment
    )
    attendance: Attendance[];

    @Column({ type: 'decimal' })
    price: number;

    @Column({ default: false })
    isCompleted: boolean;

    @Column({ default: false })
    isPaidByStudent: boolean;

    @Column({ default: false })
    isPaidToEducator: boolean;

    @Column({ default: 5 })
    rating: number;
}
