import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Course')
@Controller('v1/courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('boards/seed')
    async createBoards(){
        const res = await this.courseService.createBoards();
        return { data: res, message: 'Boards created successfully.' };
    }

    @Post()
    async createCourse(@Body() input: CreateCourseDto){
        const res = await this.courseService.createCourse(input);
        return { data: res, message: 'Course created successfully.' };
    }

    @Put(':courseId')
    async updateCourse(@Param('courseId') courseId: number, @Body() input: UpdateCourseDto){
        const res = await this.courseService.updateCourse(courseId, input);
        return { data: res, message: 'Course updated successfully.' };
    }

    @Get()
    async getCourses(){
        const res = await this.courseService.getCourses();
        return { data: res, message: 'Courses fetched successfully.' };
    }

    @Get('boards')
    async getBoards(){
        const res = await this.courseService.getBoardsIncludingCourses();
        return { data: res, message: 'Boards fetched successfully.' };
    }

}
