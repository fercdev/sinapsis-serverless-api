import { DataSourceOptions } from 'typeorm';
import { Client } from 'src/model/client.entity';
import { User } from 'src/model/user.entity';
import { Campaign } from 'src/model/campaign.entity';
import { Message } from 'src/model/message.entity';

const connectionOptions: DataSourceOptions = {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "",
    database: "sinapsis",
    synchronize: true,
    logging: false,
    entities: [ Client, User, Campaign, Message ],
};

export default connectionOptions;