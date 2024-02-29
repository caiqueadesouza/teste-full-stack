import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { EntidadeModel } from './entidade.model';

@Entity()
export class SpecialtyModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => EntidadeModel, entidade => entidade.specialties)
    @JoinTable({
        name: 'entidade_specialty',
        joinColumn: { name: 'specialtyId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'entidadeId', referencedColumnName: 'id' },
    })
    entidade: EntidadeModel[];
}