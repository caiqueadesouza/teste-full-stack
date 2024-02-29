import { Controller, Get, Post, Body } from '@nestjs/common';
import { SpecialtyService } from 'src/_services/specialty.services';
import { SpecialtyModel } from 'src/models/specialty.model';

@Controller('specialties')
export class SpecialtyController {
    constructor(private readonly specialtyService: SpecialtyService) { }

    @Post()
    create(@Body() body: SpecialtyModel): Promise<SpecialtyModel> {
        return this.specialtyService.create(body);
    }

    @Get()
    getAll(): Promise<SpecialtyModel[]> {
        return this.specialtyService.getAll();
    }

}
