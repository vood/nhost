import { createContext } from 'react';

export interface UIContextState {
  /**
   * Determines whether or not the dashboard is in maintenance mode.
   */
  maintenanceActive: boolean;
  /**
   * The date and time when maintenance mode will end.
   */
  maintenanceEndDate: Date;
}

const UIContext = createContext<UIContextState>({
  maintenanceActive: false,
  maintenanceEndDate: null,
});

export default UIContext;
