import { UserRepository } from "../../repository/userRepository";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async list () {
        return (await this.userRepository.getUserRepository()).find();
    } 
}