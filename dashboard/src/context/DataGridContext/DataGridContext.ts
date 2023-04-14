import type { UseDataGridReturn } from '@/hooks/useDataGrid';
import { createContext } from 'react';

const DataGridContext = createContext<Partial<UseDataGridReturn>>(null);

export default DataGridContext;
