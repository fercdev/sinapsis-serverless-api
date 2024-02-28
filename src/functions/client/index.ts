import { handlerPath } from '@libs/handler-resolver';

export const listClients = {
    handler: `${handlerPath(__dirname)}/handler.listClients`,
    events: [
        {
            http: {
                method: 'get',
                path: 'clients',
            },
        },
    ],
};

export const createClient = {
    handler: `${handlerPath(__dirname)}/handler.createClient`,
    events: [
        {
            http: {
                method: 'post',
                path: 'clients',
            },
        },
    ],
};

export const createUser = {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'clients/{clientId}/users',
            },
        },
    ],
};