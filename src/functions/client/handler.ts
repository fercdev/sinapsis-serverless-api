import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ClientService } from '../../service/client/clientService';
import { ClientDto } from '../../model/dto/client.dto';
import { UserDto } from '../../model/dto/user.dto';

export const createClient = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let body = <unknown> event.body;
        let clientService = new ClientService();
        const newClient = await clientService.create(body as ClientDto);
        return formatJSONResponse({newClient});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = <unknown> event.pathParameters.clientId;
        let body = <unknown> event.body;
        let clientService = new ClientService();
        const client = await clientService.createUser(id as number, body as UserDto);
        return formatJSONResponse({client});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const listClients = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let clientService = new ClientService();
        const clients = await clientService.list();
        return formatJSONResponse({clients});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})