import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { EntityType } from 'src/modules/shared/constant/enums';

export class CreateCourseDto {
    @IsNotEmpty({ message: 'Board Id can not be empty.' })
    @ApiProperty({ example: 1 })
    boardId: number;

    @IsNotEmpty({ message: 'Course name can not be empty.' })
    @ApiProperty({ example: 'Physics' })
    courseName: string;

    @IsNotEmpty({ message: 'Actual price can not be empty.' })
    @ApiProperty({ example: 5000 })
    actualPrice: number;

    @IsNotEmpty({ message: 'Discount can not be empty.' })
    @ApiProperty({ example: 10 })
    discount: number;

    @IsNotEmpty({ message: 'Discounted price can not be empty.' })
    @ApiProperty({ example: 4500 })
    discountedPrice: number;

    @MaxLength(5, {message: 'Rating can not be more than 5.'})
    @ApiProperty({ example: 5 })
    rating: number;

    @IsNotEmpty({ message: 'Url can not be empty.' })
    @ApiProperty({ example: 'https://studit.in/courses/icse/' })
    thumbnailUrl: string;
}
