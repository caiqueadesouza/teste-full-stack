import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RegionalModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}