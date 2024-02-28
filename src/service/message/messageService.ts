import { MessageRepository } from './../../repository/messageRepository';
import { CampaignRepository } from './../../repository/campaignRepository';
import { MessageDto } from '../../model/dto/message.dto'; 
import * as moment from 'moment-timezone';
import { ClientRepository } from './../../repository/clientRepository';
import { dateBetween } from "@libs/date-helper"

 
export class MessageService {
    
    private messageRepository: MessageRepository;
    private campaignRepository: CampaignRepository;
    private clientRepository: ClientRepository;

    constructor() {
        this.messageRepository = new MessageRepository();
        this.campaignRepository = new CampaignRepository();
        this.clientRepository = new ClientRepository();
    }

    async list(queryStrings) {
        const queryObject = <any> queryStrings;

        if (queryStrings && queryObject.hasOwnProperty('clientId')) {

            let clientRepository = await this.clientRepository.getClientRepository();
            
            let clientFound = await clientRepository.findOne({
                where: {clientId: queryObject.clientId},
                relations: ['user','user.campaigns','user.campaigns.messages']
            });
            if (!clientFound) {
                console.log('Client not Found');
                return [];
            }
            return clientFound;
        }
        let options = { where: {...queryStrings}};

        if (queryStrings && queryObject.hasOwnProperty('month')) {
            let extraQuery = dateBetween(queryObject.month);
            delete queryStrings.month;
            options = { where: {...queryStrings, ...extraQuery}};
        }
        
        if (!queryStrings) delete options.where;

        return (await this.messageRepository.getMessageRepository()).find(options);
    }

    async create(messageDto: MessageDto) {
        const campaignRepository = await this.campaignRepository.getCampaignRepository();
        const messageRepository = await this.messageRepository.getMessageRepository();

        const campaignFound = await campaignRepository.findOne({
            where: {campaignId: messageDto.campaignId }
        });

        if (!campaignFound) {
            throw new Error("Campaign not found");
        }

        messageDto.scheduledDatetime = moment.tz(messageDto.scheduledDatetime, 'America/Lima').toDate();
        const newMessage = await messageRepository.create(messageDto);
        const savedMessage = await messageRepository.save(newMessage);
        savedMessage.campaign = campaignFound;
        

        return await campaignRepository.save(campaignFound);
    }
}