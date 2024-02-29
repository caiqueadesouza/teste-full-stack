import { IsNotEmpty, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { RegionalModel } from './regional.model';
import { SpecialtyModel } from './specialty.model';

@Entity()
export class EntidadeModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(1, 255)
    @IsNotEmpty()
    corporate_reason: string;

    @Column()
    @Length(1, 255)
    @IsNotEmpty()
    fantasy_name: string;

    @Column()
    @IsNotEmpty()
    @Length(14, 14)
    cnpj: string;

    @Column()
    @IsNotEmpty()
    regionalId: number;

    @Column()
    @IsNotEmpty()
    opening_date: Date

    @Column()
    active: boolean;

    @ManyToOne(() => RegionalModel)
    @JoinColumn({ name: 'regionalId' })
    regional: RegionalModel;

    @ManyToMany(() => SpecialtyModel, specialty => specialty.entidade)
    @JoinTable({
        name: 'entidade_specialty',
        joinColumn: { name: 'entidadeId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'specialtyId', referencedColumnName: 'id' },
    })
    specialties: SpecialtyModel[];
}