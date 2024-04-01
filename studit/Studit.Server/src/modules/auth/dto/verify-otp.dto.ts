import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EntityType } from 'src/modules/shared/constant/enums';

export class VerifyOtpDto {
    @IsNotEmpty({ message: 'Contact number can not be empty.' })
    @ApiProperty({ example: '9853461442' })
    contactNumber: string;

    @IsNotEmpty({ message: 'OTP can not be empty.' })
    @ApiProperty({ example: '334111' })
    otp: string;

    @IsNotEmpty({ message: 'Entity type can not be empty.' })
    @ApiProperty({ example: EntityType.Student })
    entityType: EntityType;
}
