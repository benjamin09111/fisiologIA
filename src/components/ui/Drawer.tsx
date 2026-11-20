'use client';

import * as React from 'react';
import { Modal, type ModalProps } from './Modal';

export interface DrawerProps extends Omit<ModalProps, 'side'> {
  side?: 'left';
}

export function Drawer(props: DrawerProps) {
  return <Modal side="left" {...props} />;
}
