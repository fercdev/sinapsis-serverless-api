import { UserDto } from 'src/model/dto/user.dto';
import { ClientDto } from '../../model/dto/client.dto';
import { ClientRepository } from './../../repository/clientRepository';
import { UserRepository } from './../../repository/userRepository';
 
export class ClientService {
    private clientRepository: ClientRepository;
    private userRepository: UserRepository;

    constructor() {
        this.clientRepository = new ClientRepository();
        this.userRepository = new UserRepository();
    }

    async list() {
        return (await this.clientRepository.getClientRepository()).find();
    }

    async create(client: ClientDto) {
        const clientRepository = await this.clientRepository.getClientRepository();
        const newClient = clientRepository.create(client);
        return await clientRepository.save(newClient);
    }

    async createUser(clientId: number, userDto: UserDto) {
        const clientRepository = await this.clientRepository.getClientRepository();
        const userRepository = await this.userRepository.getUserRepository();

        const clientFound = await clientRepository.findOne({
            where: {clientId}
        });

        if (!clientFound) {
            throw new Error("Client not found");
        }

        const newUser = await userRepository.create(userDto);
        const savedUser = await userRepository.save(newUser);
        clientFound.user = savedUser;

        return clientRepository.save(clientFound);
    }
}