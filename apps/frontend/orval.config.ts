import { defineConfig } from 'orval';

export default defineConfig({
  coffeeStore: {
    output: {
      target: './src/api/generated/users',
      schemas: './src/api/generated/users/model',
      prettier: true,
      client: 'react-query',
      mode: 'tags',
      override: {
        mutator: {
          path: './src/api/baseApiRequest.ts',
          name: 'baseApiRequest',
        },
      },
    },
    input: {
      target: '../shared/swagger/swagger.json',
    },
  },
});
