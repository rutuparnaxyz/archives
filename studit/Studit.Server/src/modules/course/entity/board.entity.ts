import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';
import { Course } from './course.entity';

@Entity()
export class Board extends AbstarctEntity {
    @Column()
    boardName: string;

    @OneToMany(
        type => Course,
        course => course.board
    )
    course: Course[];
}
