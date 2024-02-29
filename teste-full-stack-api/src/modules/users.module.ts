import { Module } from '@nestjs/common';
import { UsersService } from 'src/_services/users.service';


@Module({
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
