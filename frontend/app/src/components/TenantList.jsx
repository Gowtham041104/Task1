import React, { useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateTenant, deleteTenant, listTenants } from '../redux/actions/tenantAction';
import TenantListItem from './TenantListItem';
import ManageTenantModal from './ManageTenantModal';

const TenantList = ({ tenants }) => {
  const dispatch = useDispatch();
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  const handleManage = (tenant) => {
    setSelectedTenant(tenant);
    setShowManageModal(true);
  };

  const handleUpdateTenant = async (id, data) => {
    await dispatch(updateTenant(id, data));
    dispatch(listTenants());  // Refresh list after update
  };

  const handleDelete = (tenantId) => {
    if (window.confirm('Confirm delete?')) {
      dispatch(deleteTenant(tenantId)).then(() => {
        dispatch(listTenants());
      });
    }
  };

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'enterprise': return <Badge bg="primary">Enterprise</Badge>;
      case 'professional': return <Badge bg="success">Professional</Badge>;
      default: return <Badge bg="warning" text="dark">Free</Badge>;
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenants?.map(tenant => (
            <TenantListItem
              key={tenant._id}
              tenant={tenant}
              onManage={handleManage}
              getPlanBadge={getPlanBadge}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>

      <ManageTenantModal
        tenant={selectedTenant}
        show={showManageModal}
        onClose={() => setShowManageModal(false)}
        onUpdate={handleUpdateTenant}
      />
    </>
  );
};

export default TenantList;
