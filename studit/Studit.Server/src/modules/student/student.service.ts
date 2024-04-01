import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Educator } from '../educator/entity/educator.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entity/student.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Educator)
        private readonly educatorRepository: Repository<Educator>
    ) {}
    
    async updateStudent(student_id: number, input: UpdateStudentDto) {
        const student = await this.getStudentTemp(student_id)

        student.firstName = input.firstName;
        student.lastName = input.lastName;
        student.email = input.email;
        student.gender = input.gender;
        student.dateOfBirth = input.dateOfBirth;
        student.parentName = input.parentName;
        student.address = input.address;
        student.city = input.city;
        student.board = input.board;
        student.classSelected = input.classSelected;
        student.currentClass = input.currentClass;
        student.subjectsGiven = input.subjectsGiven;
        student.infoAboutUs = input.infoAboutUs;

        return await this.studentRepository.save({
            ...student
        })
    }

    async verifyStudent(student_id: number) {
        const student = await this.getStudentTemp(student_id)

        student.isVerifiedByStudit = true;
        return await this.educatorRepository.save({
            ...student
        })
    }

    async uploadProfileImage(student_id: number, image: any) {
        const student = await this.getStudentTemp(student_id);
        // Upload file to cloud and get the public url.
        student.profileImageUrl = 'https://i.picsum.photos/id/657/200/200.jpg?hmac=6vrgINA0qije4LsZMVl1Rea_OtagocnfsCfETPr0_Hc';
        return await this.studentRepository.save({
            ...student
        })
    }

    private async getStudentTemp(student_id: number){
        const student = await this.studentRepository.findOne({
            where:{
                id: student_id
            }
        })
        if (student == null) {
            throw new HttpException('Student not found', HttpStatus.EXPECTATION_FAILED);
        }
        return student;
    }

    async getStudent(student_id: number){
        const student = await this.studentRepository.findOne({
            where:{
                id: student_id
            }
        })
        if (student == null) {
            throw new HttpException('Student not found', HttpStatus.EXPECTATION_FAILED);
        }
        return student;
    }

    async getStudents(){
        return await this.studentRepository.find({
            where:{
                isActive: true
            }
        });
    }
}
