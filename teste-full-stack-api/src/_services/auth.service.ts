import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<{ accessToken: string, refreshToken: string, user: any }> {
        const user = await this.usersService.findOne(email);

        if (!user || user.password !== pass) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessTokenPayload = { sub: user.userId, email: user.email };
        const refreshTokenPayload = { sub: user.userId, email: user.email, type: 'refresh' };

        const sanitizedUser = { ...user, password: undefined };

        return {
            accessToken: await this.jwtService.signAsync(accessTokenPayload),
            refreshToken: await this.jwtService.signAsync(refreshTokenPayload, { expiresIn: '7d' }),
            user: sanitizedUser,
        };
    }

    async refreshToken(refreshToken: string): Promise<{ accessToken: string, user: any }> {
        try {
            const decoded: any = this.jwtService.verify(refreshToken);

            const user = await this.usersService.findOne(decoded.email);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const accessTokenPayload = { sub: user.userId, email: user.email };
            const sanitizedUser = { ...user, password: undefined };

            return {
                accessToken: await this.jwtService.signAsync(accessTokenPayload),
                user: sanitizedUser,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

}