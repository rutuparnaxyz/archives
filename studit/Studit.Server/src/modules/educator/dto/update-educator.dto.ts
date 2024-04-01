import { ApiProperty } from "@nestjs/swagger";
import { EntityType, Gender } from "src/modules/shared/constant/enums";

export class UpdateEducatorDto {

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
    fatherOrSpouseName: string;

    @ApiProperty({ example: 'Plot 1109, Nayapalli' })
    address: string;

    @ApiProperty({ example: 'Bhubaneswar' })
    preferredCity: string;

    @ApiProperty({ example: '8895474747' })
    emergencyContactNumber: string;

    @ApiProperty({ example: 'Bsc in CS' })
    qualifications: string;

    @ApiProperty({ example: 'CBSE, CHSE, ICSE' })
    preferredBoards: string;

    @ApiProperty({ example: 'Class 1-5' })
    preferredClasses: string;

    @ApiProperty({ example: 'Math, Science' })
    preferredSubjcts: string;

    @ApiProperty({ example: 'From advertisement' })
    infoAboutUs: string;

    @ApiProperty({ example: '3.5' })
    experienceInYears: number;

    @ApiProperty({ example: '12.5' })
    distanceCanTravelInKms: number;

    @ApiProperty({ example: 'https://kite.zerodha.com/edit-profile' })
    resumeUrl: string;

}
