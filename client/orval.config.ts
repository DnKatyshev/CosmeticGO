import {defineConfig} from 'orval'

export default defineConfig({
    products: {
        output: {
          baseUrl: 'http://localhost:8000/server-side',
          mode: 'tags-split',
          target: 'src/api/products-api.ts',
          schemas: 'src/api/products-model',
          client: 'react-query',
          httpClient: 'fetch',
          mock: true,
          prettier: true
        },
        input: {
            target: 'src/Products-contract.yaml',
        },
      },
})