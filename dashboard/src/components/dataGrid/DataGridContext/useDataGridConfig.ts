import type { UseDataGridReturn } from '@/components/dataGrid/DataGrid/useDataGrid';
import { useContext } from 'react';
import DataGridContext from './DataGridContext';

export default function useDataGridConfig<T extends object = {}>() {
  const context = useContext(DataGridContext);

  if (!context) {
    throw new Error(`useDataGridConfig must be used within a DataGridContext`);
  }

  return context as unknown as UseDataGridReturn<T>;
}
