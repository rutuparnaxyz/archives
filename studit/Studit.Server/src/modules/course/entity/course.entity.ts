import { Assignment } from 'src/modules/class/entity/assignment.entity';
import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity, ManyToOne } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';
import { Board } from './board.entity';

@Entity()
export class Course extends AbstarctEntity {
    @Column()
    courseName: string;

    @Column({ type: 'decimal' })
    actualPrice: number;

    @Column({ type: 'decimal' })
    discount: number;

    @Column({ type: 'decimal' })
    discountedPrice: number;

    @Column({ default: false })
    isRecommended: boolean;

    @Column({ default: 5 })
    rating: number;

    @Column()
    thumbnailUrl: string;

    @ManyToOne(
        type => Board,
        board => board.course
    )
    board: Board;

    @OneToMany(
        type => Assignment,
        assignment => assignment.course
    )
    assignment: Assignment[];
}
