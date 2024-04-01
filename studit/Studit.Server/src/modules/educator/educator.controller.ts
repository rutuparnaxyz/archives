import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEducatorDto } from './dto/update-educator.dto';
import { EducatorService } from './educator.service';

@ApiTags('Educator')
@Controller('v1/educators')
export class EducatorController {
    constructor(private readonly educatorService: EducatorService) {}

    @Put(':educator_id')
    async updateEducator(@Param('educator_id') educator_id: number, @Body() input: UpdateEducatorDto) {
        const res = await this.educatorService.updateEducator(educator_id, input);
        return { data: res, message: 'Educator details updated successfully.' };
    }

    @Get(':educator_id')
    async getEducator(@Param('educator_id') educator_id: number) {
        const res = await this.educatorService.getEducator(educator_id);
        return { data: res, message: 'Educator details fetched successfully.' };
    }
    
    @Get()
    async getEducators() {
        const res = await this.educatorService.getEducators();
        return { data: res, message: 'Educators details fetched successfully.' };
    }
 
    @Put(':educator_id/verify')
    async verifyEducator(@Param('educator_id') educator_id: number) {
        const res = await this.educatorService.verifyEducator(educator_id);
        return { data: res, message: 'Educator verified successfully.' };
    }

    @Post(':educator_id/profile_image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadProfileImage(@Param('educator_id') educator_id: number, @UploadedFile() image: any) {
        const res = await this.educatorService.uploadProfileImage(educator_id, image);
        return { data: res, message: 'Profile image updated successfully.' };
    }
}
