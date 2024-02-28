import { CampaignDto } from 'src/model/dto/campaign.dto';
import { UserRepository } from './../../repository/userRepository';
import { CampaignRepository } from './../../repository/campaignRepository';
import * as moment from 'moment-timezone';
 
export class CampaignService {
    private userRepository: UserRepository;
    private campaignRepository: CampaignRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.campaignRepository = new CampaignRepository();
    }

    async list() {
        return (await this.campaignRepository.getCampaignRepository()).find();
    }

    async create(campaignDto: CampaignDto) {
        const userRepository = await this.userRepository.getUserRepository();
        const campaignRepository = await this.campaignRepository.getCampaignRepository();

        const userFound = await userRepository.findOne({
            where: {userId: campaignDto.userId}
        });

        if (!userFound) {
            throw new Error("User not found");
        }

        campaignDto.scheduledDatetime = moment.tz(campaignDto.scheduledDatetime, 'America/Lima').toDate();

        const newCampaign = campaignRepository.create(campaignDto);
        const savedCampaign = await campaignRepository.save(newCampaign);
        savedCampaign.user = userFound;

        return await userRepository.save(userFound);
    }
}