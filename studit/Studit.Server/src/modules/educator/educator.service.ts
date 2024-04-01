import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../student/entity/student.entity';
import { UpdateEducatorDto } from './dto/update-educator.dto';
import { Educator } from './entity/educator.entity';

@Injectable()
export class EducatorService {
    
    
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Educator)
        private readonly educatorRepository: Repository<Educator>
    ) {}
    
    async updateEducator(educator_id: number, input: UpdateEducatorDto) {
        const educator = await this.getEducatorTemp(educator_id);

        educator.firstName = input.firstName;
        educator.lastName = input.lastName;
        educator.email = input.email;
        educator.gender = input.gender;
        educator.dateOfBirth = input.dateOfBirth;
        educator.fatherOrSpouseName = input.fatherOrSpouseName;
        educator.address = input.address;
        educator.preferredCity = input.preferredCity;
        educator.emergencyContactNumber = input.emergencyContactNumber;
        educator.qualifications = input.qualifications;
        educator.preferredBoards = input.preferredBoards;
        educator.preferredSubjcts = input.preferredSubjcts;
        educator.infoAboutUs = input.infoAboutUs;
        educator.experienceInYears = input.experienceInYears;
        educator.distanceCanTravelInKms = input.distanceCanTravelInKms;
        educator.resumeUrl = input.resumeUrl;

        return await this.educatorRepository.save({
            ...educator
        })
    }

    async verifyEducator(educator_id: number) {
        const educator = await this.getEducatorTemp(educator_id);

        educator.isVerifiedByStudit = true;
        return await this.educatorRepository.save({
            ...educator
        })
    }

    async uploadProfileImage(educator_id: number, image: any) {
        const educator = await this.getEducatorTemp(educator_id);
        // Upload file to cloud and get the public url.
        educator.profileImageUrl = 'https://i.picsum.photos/id/657/200/200.jpg?hmac=6vrgINA0qije4LsZMVl1Rea_OtagocnfsCfETPr0_Hc';
        return await this.educatorRepository.save({
            ...educator
        })
    }

    private async getEducatorTemp(educator_id: number){
        const educator = await this.educatorRepository.findOne({
            where:{
                id: educator_id
            }
        })
        if (educator == null) {
            throw new HttpException('Educator not found', HttpStatus.EXPECTATION_FAILED);
        }
        return educator;
    }

    async getEducator(educator_id: number){
        const educator = await this.educatorRepository.findOne({
            where:{
                id: educator_id
            }
        })
        if (educator == null) {
            throw new HttpException('Educator not found', HttpStatus.EXPECTATION_FAILED);
        }
        return educator;
    }

    async getEducators(){
        return await this.educatorRepository.findOne({
            where:{
                isActive: true
            }
        })
    }
}
