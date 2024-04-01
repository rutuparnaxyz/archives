import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Board } from './entity/board.entity';
import { Course } from './entity/course.entity';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async createBoards(){
        let boards = [];
        let cbse = new Board();
        cbse.boardName = 'CBSE';
        boards.push(cbse);
        let icse = new Board();
        icse.boardName = 'ICSE';
        boards.push(icse);
        let stateBoard = new Board();
        stateBoard.boardName = 'State Board';
        boards.push(stateBoard);
        let others = new Board();
        others.boardName = 'Others';
        boards.push(others);

        return await this.boardRepository.save(boards);
    }

    async createCourse(input: CreateCourseDto){
        const board = await this.boardRepository.findOne({
            where:{
                id: input.boardId
            }
        }) 
        const course = new Course();
        course.courseName = input.courseName;
        course.actualPrice = input.actualPrice;
        course.discount = input.discount;
        course.discountedPrice = input.discountedPrice;
        course.rating = input.rating;
        course.thumbnailUrl = input.thumbnailUrl;
        course.board = board;
        return await this.courseRepository.save(course);
    }

    async updateCourse(courseId: number, input: UpdateCourseDto){
        let course = await this.courseRepository.findOne({
            where:{
                id: courseId
            }
        });
        if (course == null) {
            throw new HttpException('Course not found.', HttpStatus.EXPECTATION_FAILED);
        }
        const board = await this.boardRepository.findOne({
            where:{
                id: input.boardId
            }
        }) 
        course.courseName = input.courseName;
        course.actualPrice = input.actualPrice;
        course.discount = input.discount;
        course.discountedPrice = input.discountedPrice;
        course.rating = input.rating;
        course.thumbnailUrl = input.thumbnailUrl;
        course.isRecommended = input.isRecommended;
        course.isActive = input.isActive;
        course.board = board;
        return await this.courseRepository.save({
            ...course
        })
    }

    async getBoardsIncludingCourses(){
        return await this.boardRepository.find({
            relations: ['course']
        })
    }

    async getCourses(){
        return await this.courseRepository.find({
            relations: ['board']
        })
    }
}
