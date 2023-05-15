import SettingsLayout from '@/components/settings/SettingsLayout';
import ActivityIndicator from '@/ui/v2/ActivityIndicator';
import introspection from '@/utils/__generated__/introspection.json';
import type { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useEffect } from 'react';

export interface SettingsPageProps {
  config?: any;
}

export default function SettingsPage({ config }: SettingsPageProps) {
  const { isFallback, isReady, replace } = useRouter();

  useEffect(() => {
    if (!isReady || isFallback || config) {
      return;
    }

    replace('/404');
  }, [config, isFallback, isReady, replace]);

  if (!config) {
    return null;
  }

  if (isFallback) {
    return <ActivityIndicator label="Loading settings..." />;
  }

  const parsedConfig = JSON.parse(config);

  return <div>{Object.keys(parsedConfig).join(', ')}</div>;
}

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingsLayout>{page}</SettingsLayout>;
};

export function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id as string;
  // eslint-disable-next-line no-underscore-dangle
  const mainConfig = introspection.__schema.types.find(
    ({ name }) => name === 'ConfigConfig',
  );

  const type = mainConfig.fields.find((field) => field.name === id)?.type;
  // eslint-disable-next-line no-underscore-dangle
  const config = introspection.__schema.types.find(
    ({ name }) => name === type?.name,
  );

  return {
    props: {
      config: config ? JSON.stringify(config) : null,
    },
  };
}

export function getStaticPaths() {
  // eslint-disable-next-line no-underscore-dangle
  const mainConfig = introspection.__schema.types.find(
    ({ name }) => name === 'ConfigConfig',
  );

  return {
    paths: mainConfig?.fields.map(({ name }) => ({
      params: {
        workspaceSlug: '[workspaceSlug]',
        appSlug: '[appSlug]',
        id: name,
      },
    })),
    fallback: true,
  };
}
