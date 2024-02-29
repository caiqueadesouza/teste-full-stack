import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/_services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh-token')
    refreshToken(@Body() refreshDto: Record<string, any>) {
        return this.authService.refreshToken(refreshDto.refreshToken);
    }
}
