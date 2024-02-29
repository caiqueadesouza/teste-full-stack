import { Regional } from "./regional.model";
import { Specialty } from "./specialty.model";

export class Entity {
    id: number;
    corporate_reason: string;
    fantasy_name: string;
    cnpj: string;
    regionalId: string;
    opening_date: string;
    active: boolean;
    regional: Regional = new Regional();
    specialties: Specialty = new Specialty()
}