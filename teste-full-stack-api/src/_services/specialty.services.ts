import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialtyModel } from 'src/models/specialty.model';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialtyService {
    constructor(
        @InjectRepository(SpecialtyModel)
        private readonly specialtyRepository: Repository<SpecialtyModel>,
    ) { }

    async create(regional: SpecialtyModel): Promise<SpecialtyModel> {
        return this.specialtyRepository.save(regional);
    }

    async getAll(): Promise<SpecialtyModel[]> {
        return this.specialtyRepository.find({
            order: {
                name: "ASC",
            },
        });
    }

    async seed() {
        
        const existingSpecialties = await this.specialtyRepository.find();
        if (existingSpecialties.length === 0) {
            const specialtyData = [
                { name: 'Clínica Médica' },
                { name: 'Pediatria' },
                { name: 'Cirurgia Geral' },
                { name: 'Anestesiologia' },
                { name: 'Cardiologia' },
                { name: 'Oftalmologia' },
                { name: 'Psiquiatria' },
                { name: 'Dermatologia' }
            ];

            const specialtiesPromises = specialtyData.map(data => this.create(data as SpecialtyModel));
            await Promise.all(specialtiesPromises);
        } else {
            console.log('Specialties data already exists. Skipping seed.');
        }

    }
}