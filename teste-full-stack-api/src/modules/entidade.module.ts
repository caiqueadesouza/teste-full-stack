import { Module } from "@nestjs/common";
import { EntidadeController } from "src/controllers/entidade.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeModel } from "src/models/entidade.model";
import { EntidadeService } from "src/_services/entidade.services";
import { SpecialtyService } from "src/_services/specialty.services";
import { SpecialtyModel } from "src/models/specialty.model";


@Module({
    imports: [TypeOrmModule.forFeature([EntidadeModel, SpecialtyModel])],
    controllers: [EntidadeController],
    providers: [EntidadeService, SpecialtyService]
})
export class EntidadeModule {

}