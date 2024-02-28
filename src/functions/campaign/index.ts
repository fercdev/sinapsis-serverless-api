import { handlerPath } from '@libs/handler-resolver';

export const listCampaigns = {
    handler: `${handlerPath(__dirname)}/handler.listCampaigns`,
    events: [
        {
            http: {
                method: 'get',
                path: 'campaigns',
            },
        },
    ],
};

export const createCampaign = {
    handler: `${handlerPath(__dirname)}/handler.createCampaign`,
    events: [
        {
            http: {
                method: 'post',
                path: 'campaigns',
                documentation: {
                    summary: "Crear campania",
                    description: "Permite crear una camapania por cliente",
                    requestBody: {
                        description: "Atributos requeridos para crear una camapania {name}, {userId}, {scheduledDatetime}, {status}"
                    },
                    methodResponses: [
                        {
                            statusCode: 200,
                            responseBody: {
                                description: "Retorna el recurso campaign"
                            },
                            responseModels : {
                                "application/json": "campaignModel"
                            }
                
                        }
                    ],
                }
            },
        },
    ],
};