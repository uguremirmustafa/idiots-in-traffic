import { ReactNode } from 'react';

export interface ModalProps {
  id: 'welcome' | 'add-report' | null;
  title?: string;
  content?: ReactNode;
}
