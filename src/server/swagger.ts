export const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Fetch Github Gist for Users',
  },
  basePath: '/api',
  schemes: 'http',
  paths: {
    '/ping': {
      get: {
        tags: ['HEALTH'],
        summary: 'ping the server (can be used by monitoring services)',
        responses: {
          '200': {
            description: 'ping status',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'ping response',
                },
              },
            },
          },
          '503': {
            description: 'server down',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'server down message',
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: ['HEALTH'],
        summary: 'check health of the server',
        responses: {
          '200': {
            description: 'server health',
            schema: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  description: 'server status',
                }
              },
            },
          },
        },
      },
    },
    '/v1/gist': {
      get: {
        tags: ['GIST'],
        summary: 'search for github gists of a given user name',
        parameters: [
          {
            in: 'query',
            name: 'user_name',
            description: 'search user_name gists',
            required: true,
            type: 'string',
            example: 'user_name'
          },
        ],
        responses: {
          '200': {
            description: 'success',
            schema: {
              type: 'object',
            },
          },
          '400': {
            description: 'bad request',
            schema: {
              type: 'object',
            },
          },
          '403': {
            description: 'rate limit exceeded',
            schema: {
              type: 'object',
            },
          },
          '500': {
            description: 'internal server error',
            schema: {
              type: 'object',
            },
          },
        },
      },
    },
    '/v1/gist/{gist_id}': {
      get: {
        tags: ['GIST'],
        summary: 'fetch details of given gist id',
        parameters: [
          {
            in: 'path',
            name: 'gist_id',
            description: 'details of gist for given gist id',
            required: true,
            type: 'string',
            example: 'gist_id'
          },
        ],
        responses: {
          '200': {
            description: 'success',
            schema: {
              type: 'object',
            },
          },
          '400': {
            description: 'bad request',
            schema: {
              type: 'object',
            },
          },
          '403': {
            description: 'rate limit exceeded',
            schema: {
              type: 'object',
            },
          },
          '500': {
            description: 'internal server error',
            schema: {
              type: 'object',
            },
          },
        },
      },
    }
  },
};
