import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EntidadeModel } from "src/models/entidade.model";
import { EntidadeService } from "src/_services/entidade.services";
import { SpecialtyService } from "src/_services/specialty.services";

@Controller('/entity')
export class EntidadeController {

    constructor(
        private readonly entidadeService: EntidadeService,
        private readonly specialtyService: SpecialtyService,
    ) { }

    @Post()
    create(@Body() body: EntidadeModel): Promise<EntidadeModel> {
        return this.entidadeService.create(body);
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<EntidadeModel> {
        return this.entidadeService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: EntidadeModel): Promise<EntidadeModel> {
        return this.entidadeService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Promise<string> {
        return this.entidadeService.delete(id);
    }

    @Get()
    findAll(
        @Query('filter') filter: string,
        @Query('orderBy') orderBy: string,
        @Query('order') order: 'ASC' | 'DESC',
        @Query('page') page: number,
        @Query('limit') limit: number,
    ) {
        return this.entidadeService.findAll(filter, orderBy, order, page, limit);
    }

}