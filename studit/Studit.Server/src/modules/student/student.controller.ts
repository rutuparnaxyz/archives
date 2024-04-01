import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentService } from './student.service';

@ApiTags('Student')
@Controller('v1/students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Put(':student_id')
    async updateStudent(@Param('student_id') student_id: number, @Body() input: UpdateStudentDto) {
        const res = await this.studentService.updateStudent(student_id, input);
        return { data: res, message: 'Student details updated successfully.' };
    }

    @Get(':student_id')
    async getStudent(@Param('student_id') student_id: number) {
        const res = await this.studentService.getStudent(student_id);
        return { data: res, message: 'Student details fetched successfully.' };
    }

    @Get()
    async getStudents() {
        const res = await this.studentService.getStudents();
        return { data: res, message: 'Students details fetched successfully.' };
    }

    @Put(':student_id/verify')
    async verifyStudent(@Param('student_id') student_id: number) {
        const res = await this.studentService.verifyStudent(student_id);
        return { data: res, message: 'Student verified successfully.' };
    }

    @Post(':student_id/profile_image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProfileImage(@Param('student_id') student_id: number, @UploadedFile() image: any) {
        const res = await this.studentService.uploadProfileImage(student_id, image);
        return { data: res, message: 'Profile image updated successfully.' };
    }
}
