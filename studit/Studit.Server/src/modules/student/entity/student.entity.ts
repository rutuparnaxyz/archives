import { Assignment } from 'src/modules/class/entity/assignment.entity';
import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';

@Entity()
export class Student extends AbstarctEntity {
    @Column()
    contactNumber: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    gender: Gender;

    @Column({ nullable: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    dateOfBirth: string;

    @Column({ nullable: true })
    parentName: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    board: string;

    @Column({ nullable: true })
    classSelected: string;

    @Column({ nullable: true })
    currentClass: string;

    @Column({ nullable: true })
    subjectsGiven: string;

    @Column({ nullable: true })
    infoAboutUs: string;

    @Column({ nullable: true })
    profileImageUrl: string;

    @Column({ default: EntityType.Student })
    entityType: EntityType;
    
    @Column({ default: false })
    isVerifiedByStudit: boolean;

    @OneToMany(
        type => Assignment,
        assignment => assignment.student
    )
    assignment: Assignment[];
}
