import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { UserService } from '../../service/user/userService';

export const listUsers = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        let userService = new UserService();
        const users = await userService.list();
        return formatJSONResponse({users});
    } catch (e) {
        console.log('catchMesageError',e);
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
