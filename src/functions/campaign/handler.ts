import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { CampaignService } from '../../service/campaign/campaignService';
import { CampaignDto } from '../../model/dto/campaign.dto'

export const listCampaigns = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let campaignService = new CampaignService();
        const campaigns = await campaignService.list();
        return formatJSONResponse({campaigns});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const createCampaign = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let body = <unknown> event.body;
        let campaignService = new CampaignService();
        const campaign = await campaignService.create(body as CampaignDto);
        return formatJSONResponse({campaign});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})