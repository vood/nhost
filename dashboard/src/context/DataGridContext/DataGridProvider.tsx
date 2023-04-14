import type { UseDataGridReturn } from '@/hooks/useDataGrid';
import type { PropsWithChildren } from 'react';
import DataGridContext from './DataGridContext';

export default function DataGridProvider<T extends object = {}>({
  children,
  ...value
}: PropsWithChildren<UseDataGridReturn<T>>) {
  return (
    <DataGridContext.Provider value={value as unknown as UseDataGridReturn<{}>}>
      {children}
    </DataGridContext.Provider>
  );
}
