import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('send_otp')
    async sendOtp(@Body() input: SendOtpDto) {
        const res = await this.authService.sendOtp(input);
        return { data: res, message: 'Otp sent successfully.' };
    }

    @Post('verify_otp')
    async verifyOtp(@Body() input: VerifyOtpDto) {
        const res = await this.authService.verifyOtp(input);
        return { data: res, message: 'Otp verified successfully.' };
    }
}
