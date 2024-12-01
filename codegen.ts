import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',  // URL schema GraphQL atau path lokal ke file schema
  documents: 'src/**/*.graphql',  // Path ke query/mutation GraphQL yang digunakan dalam proyek
  generates: {
    'src/types/graphql_types.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.tsx', baseTypesPath: './types/graphql_types.ts' },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: { withHooks: true },
    },
  },
};

export default config;
