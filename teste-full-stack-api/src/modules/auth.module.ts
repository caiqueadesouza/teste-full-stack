import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { AuthService } from 'src/_services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
        UsersModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
