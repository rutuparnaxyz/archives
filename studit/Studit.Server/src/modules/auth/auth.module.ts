import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Educator } from '../educator/entity/educator.entity';
import { Student } from '../student/entity/student.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Otp } from './entity/otp.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Otp, Educator, Student]),
    JwtModule.register({
        secret: 'BuyerGainsSecret',
        signOptions: { expiresIn: '7d' }
    }),],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
