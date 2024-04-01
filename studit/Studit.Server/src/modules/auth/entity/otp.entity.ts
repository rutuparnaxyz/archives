import { EntityType, Gender } from 'src/modules/shared/constant/enums';
import { Entity, Column, BeforeInsert, OneToMany, BaseEntity } from 'typeorm';
import { AbstarctEntity } from '../../shared/entity/abstract.entity';

@Entity()
export class Otp extends AbstarctEntity {
    @Column()
    contactNumber: string;

    @Column()
    otp: string;

    @Column({ type: 'timestamp', nullable: true })
    expiryDate: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column()
    entityType: EntityType;
}
