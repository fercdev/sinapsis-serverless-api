import type { AWS } from '@serverless/typescript';

import { createClient, createUser, listClients } from '@functions/client';
import { listUsers } from '@functions/user';
import { listCampaigns, createCampaign } from '@functions/campaign';
import { listMessages, createMessage } from '@functions/message';

const serverlessConfiguration: AWS = {
  service: 'sinapsis-serverless-api',
  frameworkVersion: '3',
  plugins: ['serverless-openapi-documentation','serverless-esbuild', 'serverless-offline'],
  useDotenv: true,
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { createClient, createUser, listClients, listUsers, listCampaigns, createCampaign, listMessages, createMessage },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },

    documentation: {
      version: '1',
      title: 'Sinapsis API',
      description: 'Api para generar camapanias y mensajes',
      models: [
        {
          name: 'campaignModel',
          description: 'POST del modelo capania',
          contentType: 'application/json',
          schema: {
            $schema: "",
            properties: {
              Campaign: {
                type: "object",
                properties:[
                  {
                    campaignId: {
                      type: 'int'
                    }
                  },
                  {
                    name: {
                      type: 'string'
                    }
                  },
                  {
                    userId: {
                      type: 'int'
                    }
                  },
                  {
                    scheduledDatetime: {
                      type: 'datetime'
                    }
                  },
                  {
                    status: {
                      type: 'tinyint'
                    }
                  },
                ]
              }
            }
          }

        }
      ],
    }


  },
};

module.exports = serverlessConfiguration;
