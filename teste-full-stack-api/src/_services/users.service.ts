import { Injectable } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            id: 1,
            email: 'joao@gmail.com',
            password: '123456',
        },
        {
            id: 2,
            email: 'maria@gmail.com',
            password: '123456',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}