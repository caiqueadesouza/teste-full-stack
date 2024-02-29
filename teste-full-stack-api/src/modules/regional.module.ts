import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionalModel } from "src/models/regional.model";
import { RegionalService } from "src/_services/regional.service";
import { RegionalController } from "src/controllers/regional.controller";


@Module({
    imports: [TypeOrmModule.forFeature([RegionalModel])],
    controllers: [RegionalController],
    providers: [RegionalService]
})
export class RegionalModule {

}