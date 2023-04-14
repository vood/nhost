import type { UseDataGridReturn } from '@/components/dataGrid/DataGrid/useDataGrid';
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
