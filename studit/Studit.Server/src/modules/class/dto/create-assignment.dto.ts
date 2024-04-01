import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { EntityType } from 'src/modules/shared/constant/enums';

export class CreateAssignmentDto {
    @IsNotEmpty({ message: 'Student Id can not be empty.' })
    @ApiProperty({ example: 1 })
    studentId: number;

    @IsNotEmpty({ message: 'Educator Id can not be empty.' })
    @ApiProperty({ example: 1 })
    educatorId: number;

    @IsNotEmpty({ message: 'Course Id can not be empty.' })
    @ApiProperty({ example: 1 })
    courseId: number;

    @IsNotEmpty({ message: 'Price can not be empty.' })
    @ApiProperty({ example: 5000 })
    price: number;
}
