import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntidadeModel } from 'src/models/entidade.model';
import { SpecialtyModel } from 'src/models/specialty.model';
import { Repository } from 'typeorm';

@Injectable()
export class EntidadeService {
    constructor(
        @InjectRepository(EntidadeModel)
        private readonly entidadeRepository: Repository<EntidadeModel>,
        @InjectRepository(SpecialtyModel)
        private readonly specialtyRepository: Repository<SpecialtyModel>,
    ) { }

    async findAll(
        filter: string,
        orderBy: string,
        order: 'ASC' | 'DESC',
        page: number,
        limit: number = 10,
    ): Promise<{ itens: EntidadeModel[]; total: number }> {
        const query = this.entidadeRepository.createQueryBuilder('entidade');

        query.leftJoinAndSelect('entidade.regional', 'regional');
        query.leftJoinAndSelect('entidade.specialties', 'specialties');

        if (filter) {
            query.andWhere('entidade.corporate_reason LIKE :filter OR entidade.fantasy_name LIKE :filter OR entidade.fantasy_name LIKE :cnpj', {
                filter: `%${filter}%`,
            });
        }

        if (orderBy && order) {
            query.orderBy(`entidade.${orderBy}`, order);
        } else {
            query.orderBy('entidade.fantasy_name', 'ASC');
        }

        if (page && limit) {
            query.skip((page - 1) * limit).take(limit);
        }

        const [itens, total] = await query.getManyAndCount();

        return { itens, total };
    }

    async create(entidade: EntidadeModel): Promise<EntidadeModel> {
        const specialties = await this.specialtyRepository.findByIds(entidade.specialties);

        entidade.specialties = specialties;
        return this.entidadeRepository.save(entidade);
    }

    async getOne(id: number): Promise<EntidadeModel> {
        const query = this.entidadeRepository.createQueryBuilder('entidade');

        query.leftJoinAndSelect('entidade.regional', 'regional');
        query.leftJoinAndSelect('entidade.specialties', 'specialties');
        query.where({ id });

        const entidade = await query.getOne();

        if (!entidade) {
            throw new NotFoundException(`Entidade com o id ${id} não encontrada`);
        }

        return entidade;
    }

    async update(id: number, body: EntidadeModel): Promise<EntidadeModel> {
        const entidade = await this.entidadeRepository.findOne({ where: { id } });

        if (!entidade) {
            throw new NotFoundException(`Não encontrado a entidade de id ${id}`);
        }

        Object.assign(entidade, body);

        if (body.specialties && body.specialties.length > 0) {
            const specialties = await this.specialtyRepository.findByIds(body.specialties);
            entidade.specialties = specialties;
        }

        await this.entidadeRepository.save(entidade);
        return entidade;
    }

    async delete(id: number): Promise<string> {
        const entidade = await this.entidadeRepository.findOne({ where: { id } });

        if (!entidade) {
            throw new NotFoundException(`Não encontrado a entidade de id ${id}`);
        }

        await this.entidadeRepository.delete(id);

        return `A entidade com id ${id} foi deletada com sucesso`;
    }
}
