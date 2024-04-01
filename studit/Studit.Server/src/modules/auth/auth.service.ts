import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Educator } from '../educator/entity/educator.entity';
import { EntityType } from '../shared/constant/enums';
import { Student } from '../student/entity/student.entity';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Otp } from './entity/otp.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Educator)
        private readonly educatorRepository: Repository<Educator>,
        private readonly jwtService: JwtService,
    ) {}

    async sendOtp(input: SendOtpDto) {
        if ((input.entityType == EntityType.Student)) {
            // Check if the number exists in Educators
            const educator = await this.educatorRepository.findOne({
                where: {
                    contactNumber: input.contactNumber
                }
            });

            if (educator != null) {
                throw new HttpException('This number is already registered as educators.', HttpStatus.EXPECTATION_FAILED);
            }
        } else {
            // Check if the number exists in Educators
            const student = await this.studentRepository.find({
                where: {
                    contactNumber: input.contactNumber
                }
            });
            if (student.length != null) {
                throw new HttpException('This number is already registered as students.', HttpStatus.EXPECTATION_FAILED);
            }
        }

        // Set isActive to false for previous OTPs for this contact number.
        const previousOtps = await this.otpRepository.find({
            where: {
                contactNumber: input.contactNumber
            }
        });
        for (let i = 0; i < previousOtps.length; i++) {
            previousOtps[i].isActive = false;
            this.otpRepository.save({
                ...previousOtps[i]
            });
        }

        // Generate the new OTP.
        const otpObj = new Otp();
        const currentDate = new Date();
        otpObj.contactNumber = input.contactNumber;
        otpObj.otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpObj.expiryDate = new Date(currentDate.setMinutes(currentDate.getMinutes() + 10)).toString();
        otpObj.entityType = input.entityType;
        // Send OTP to the registerd mobile number.
        ///
        // Send email to Studit team regarding the login process.
        return await this.otpRepository.save(otpObj);
    }

    async verifyOtp(input: VerifyOtpDto) {
        let tokenObj = {
            id: 0
        }
        const otpObj = await this.otpRepository.findOne({
            where: {
                contactNumber: input.contactNumber,
                otp: input.otp,
                entityType: input.entityType,
                isActive: true,
                isVerified: false
            }
        });
        if (otpObj == null) {
            throw new HttpException('OTP did not match. Please try again', HttpStatus.EXPECTATION_FAILED);
        }
        if ((input.entityType == EntityType.Student)) {
            // Check if this is a existing student and send otp.
            const exStudent = await this.studentRepository.findOne({
                where: {
                    contactNumber: input.contactNumber
                }
            });

            // If not existing student create a student against that contact number.
            if (exStudent == null) {
                const newStudent = new Student();
                newStudent.contactNumber = input.contactNumber;
                const createdStudent = await this.studentRepository.save(newStudent);
                tokenObj.id = createdStudent.id;
            }
            tokenObj.id = exStudent.id;
        } else {
            // Check if this is a existing student and send otp.
            const exEducator = await this.educatorRepository.findOne({
                where: {
                    contactNumber: input.contactNumber
                }
            });

            // If not existing student create a student against that contact number.
            if (exEducator == null) {
                const newEducator = new Educator();
                newEducator.contactNumber = input.contactNumber;
                const craetedEducator = await this.educatorRepository.save(newEducator);
                tokenObj.id = craetedEducator.id;
            }
            tokenObj.id = exEducator.id;
        }

        otpObj.isVerified = true;
        otpObj.isActive = false;

        const token = this.jwtService.sign(tokenObj);
        await this.otpRepository.save({
            ...otpObj
        })
        return token;
    }
}
