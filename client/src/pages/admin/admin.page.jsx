import React from 'react';

import { AdminContainer } from './admin.styles';
import Inventory from '../../components/admin/inventory/inventory.component';
import ControlPanel from '../../components/admin/control-panel/control-panel.component';

const AdminPage = ({ ...otherProps }) => (
  <AdminContainer>
    <ControlPanel className='admin-control-panel' />
    <Inventory className='admin-inventory' />
  </AdminContainer>
);

export default AdminPage;
