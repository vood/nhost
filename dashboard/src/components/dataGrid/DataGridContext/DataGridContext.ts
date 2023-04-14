import type { UseDataGridReturn } from '@/components/dataGrid/DataGrid/useDataGrid';
import { createContext } from 'react';

const DataGridContext = createContext<Partial<UseDataGridReturn>>(null);

export default DataGridContext;
