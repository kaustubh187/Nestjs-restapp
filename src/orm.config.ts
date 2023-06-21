import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./Users/User.model";

export const config: TypeOrmModuleOptions = {

    type: 'postgres',
    port: 5432,
    username:'postgres',
    password:'root@123',
    host: '127.0.0.1',
    database: 'users',
    entities: [User],
    synchronize: true
}