import { Controller, Get, Post, Body } from '@nestjs/common';
import { RegionalService } from 'src/_services/regional.service';
import { RegionalModel } from 'src/models/regional.model';

@Controller('regionais')
export class RegionalController {
    constructor(private readonly regionalService: RegionalService) { }

    @Post()
    create(@Body() body: RegionalModel): Promise<RegionalModel> {
        return this.regionalService.create(body);
    }

    @Get()
    getAll(): Promise<RegionalModel[]> {
        return this.regionalService.getAll();
    }

}
