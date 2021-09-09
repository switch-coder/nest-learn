import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: 'localhost',
    port: 3309,
    username: "root",
    password: "1234",
    database: "boards",
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}