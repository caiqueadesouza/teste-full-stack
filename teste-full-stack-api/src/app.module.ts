import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadeModule } from './modules/entidade.module';
import { AuthModule } from './modules/auth.module';
import { RegionalModule } from './modules/regional.module';
import { SpecialtyModule } from './modules/specialty.module';


@Module({
  imports: [
    EntidadeModule,
    AuthModule,
    RegionalModule,
    SpecialtyModule,
    TypeOrmModule.forRoot(
      {
        "type": "sqlite",
        "database": "./db.sql",
        "synchronize": true,
        "entities": ["dist/**/*.model.js"]
      },
    ),
  ],
})
export class AppModule { }