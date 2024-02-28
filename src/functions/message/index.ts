import { handlerPath } from '@libs/handler-resolver';

export const listMessages = {
    handler: `${handlerPath(__dirname)}/handler.listMessages`,
    events: [
        {
            http: {
                method: 'get',
                path: 'messages',
            },
        },
    ],
};

export const createMessage = {
    handler: `${handlerPath(__dirname)}/handler.createMessage`,
    events: [
        {
            http: {
                method: 'post',
                path: 'messages',
            },
        },
    ],
};
