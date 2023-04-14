import { useContext } from 'react';
import UIContext from './UIContext';

/**
 * Hook to access the UI context.
 *
 * @throws If used outside of the UIProvider
 * @returns The UI context
 */
export default function useUI() {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
}
