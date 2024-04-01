import { ApiProperty } from "@nestjs/swagger";
import { EntityType, Gender } from "src/modules/shared/constant/enums";

export class UpdateStudentDto {

    @ApiProperty({ example: 'Rutuparna' })
    firstName: string;

    @ApiProperty({ example: 'Rout' })
    lastName: string;

    @ApiProperty({ example: Gender.Male })
    gender: Gender;

    @ApiProperty({ example: 'r7.rutuparna@gmail.com' })
    email: string;

    @ApiProperty({ example: new Date().toString() })
    dateOfBirth: string;

    @ApiProperty({ example: 'Ashok Kumar Rout' })
    parentName: string;

    @ApiProperty({ example: 'Plot 1109, Nayapalli' })
    address: string;

    @ApiProperty({ example: 'Bhubaneswar' })
    city: string;

    @ApiProperty({ example: 'ICSE' })
    board: string;

    @ApiProperty({ example: 'Class 1-9' })
    classSelected: string;

    @ApiProperty({ example: '9th Standard' })
    currentClass: string;

    @ApiProperty({ example: 'Math, Science' })
    subjectsGiven: string;

    @ApiProperty({ example: 'From advertisement' })
    infoAboutUs: string;

}
