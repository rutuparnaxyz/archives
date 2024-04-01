import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';
import { Assignment } from './assignment.entity';

@Entity()
export class Attendance extends AbstarctEntity {

    @Column({ type: 'timestamp', nullable:true })
    date: string;

    @Column({ default: false })
    isStudentSigned: boolean;

    @Column({ default: false })
    isEducatorSigned: boolean;

    @Column({ nullable: true })
    studentNote: string;

    @Column({ nullable: true })
    educatorNote: string;

    @ManyToOne(
        type => Assignment,
        assignment => assignment.attendance
    )
    assignment: Assignment;
}
