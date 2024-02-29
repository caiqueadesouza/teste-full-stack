import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionalModel } from 'src/models/regional.model';
import { Repository } from 'typeorm';

@Injectable()
export class RegionalService {
    constructor(
        @InjectRepository(RegionalModel)
        private readonly regionalRepository: Repository<RegionalModel>,
    ) { }

    async create(regional: RegionalModel): Promise<RegionalModel> {
        return this.regionalRepository.save(regional);
    }

    async getAll(): Promise<RegionalModel[]> {
        return this.regionalRepository.find({
            order: {
                name: "ASC",
            },
        });
    }

    async seed() {

        const existingSpecialties = await this.regionalRepository.find();
        if (existingSpecialties.length === 0) {
            const regionaisData = [
                { name: 'Alto tietê' },
                { name: 'Interior' },
                { name: 'ES' },
                { name: 'SP Interior' },
                { name: 'SP' },
                { name: 'SP2' },
                { name: 'MG' },
                { name: 'Nacional' },
                { name: 'SP CAV' },
                { name: 'RJ' },
                { name: 'SP2' },
                { name: 'SP1' },
                { name: 'NE1' },
                { name: 'NE2' },
                { name: 'SUL' },
                { name: 'Norte' },
            ];

            const regionaisPromises = regionaisData.map(data => this.create(data as RegionalModel));
            await Promise.all(regionaisPromises);
        } else {
            console.log('Regiões data already exists. Skipping seed.');
        }
    }

}
