import { handlerPath } from '@libs/handler-resolver';

export const listUsers = {
    handler: `${handlerPath(__dirname)}/handler.listUsers`,
    events: [
        {
            http: {
                method: 'get',
                path: 'users',
            },
        },
    ],
};
