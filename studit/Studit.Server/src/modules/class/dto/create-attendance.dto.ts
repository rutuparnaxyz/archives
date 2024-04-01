import { ApiProperty } from "@nestjs/swagger";

export class CreateAttendanceDto {

    @ApiProperty({ example: 1 })
    classId: number;

    @ApiProperty({ example: new Date().toString() })
    date: string;

    @ApiProperty({ example: true })
    isStudentSigned: boolean;

    @ApiProperty({ example: true })
    isEducatorSigned: boolean;

    @ApiProperty({ example: 'Student Note' })
    studentNote: string;

    @ApiProperty({ example: 'Educator Note' })
    educatorNote: string;

}
