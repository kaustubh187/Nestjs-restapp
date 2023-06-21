import { Module } from "@nestjs/common";
import { UserController } from "./User.controller";
import { UserService } from "./User.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./User.model";

@Module({
    controllers: [UserController],
    providers: [UserService],
})

export class UsersModule {}