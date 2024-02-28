import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { MessageService } from '../../service/message/messageService';
import { MessageDto } from '../../model/dto/message.dto';

export const listMessages = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let queryStrings = event.queryStringParameters;
        let messageService = new MessageService();
        const messages = await messageService.list(queryStrings);
        return formatJSONResponse({messages});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})


export const createMessage = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let body = <unknown> event.body;
        let messageService = new MessageService();
        const message = await messageService.create(body as MessageDto);
        return formatJSONResponse({message});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})