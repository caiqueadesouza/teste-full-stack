import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyService } from "src/_services/specialty.services";
import { SpecialtyController } from "src/controllers/specialty.controller";
import { SpecialtyModel } from "src/models/specialty.model";


@Module({
    imports: [TypeOrmModule.forFeature([SpecialtyModel])],
    controllers: [SpecialtyController],
    providers: [SpecialtyService]
})
export class SpecialtyModule {

}