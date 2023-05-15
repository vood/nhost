import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: {
    'https://local.graphql.nhost.run/v1': {
      headers: {
        'x-hasura-admin-secret': 'nhost-admin-secret',
      },
    },
  },
  documents: ['src/**/*.graphql', 'src/**/*.gql'],
  generates: {
    'src/utils/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withRefetchFn: true,
      },
    },
  },
};

export default config;
