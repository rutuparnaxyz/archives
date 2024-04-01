import { DecipherCCM } from 'crypto';
import { Assignment } from 'src/modules/class/entity/assignment.entity';
import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';

@Entity()
export class Educator extends AbstarctEntity {
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
    fatherOrSpouseName: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    preferredCity: string;

    @Column({ nullable: true })
    emergencyContactNumber: string;

    @Column({ nullable: true })
    qualifications: string;

    @Column({ nullable: true })
    preferredBoards: string;

    @Column({ nullable: true })
    preferredClasses: string;

    @Column({ nullable: true })
    preferredSubjcts: string;

    @Column({ nullable: true })
    infoAboutUs: string;

    @Column({ type: 'decimal', nullable: true })
    experienceInYears: number;

    @Column({ type: 'decimal', nullable: true })
    distanceCanTravelInKms: number;

    @Column({ nullable: true })
    resumeUrl: string;

    @Column({ nullable: true })
    profileImageUrl: string;

    @Column({ default: EntityType.Educator })
    entityType: EntityType;

    @Column({ default: false })
    isVerifiedByStudit: boolean;

    @OneToMany(
        type => Assignment,
        assignment => assignment.educator
    )
    assignment: Assignment[];
}
