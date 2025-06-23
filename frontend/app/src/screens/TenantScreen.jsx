import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTenants } from '../redux/actions/tenantAction';
import { Container, Button } from 'react-bootstrap';
import TenantList from '../components/TenantList';
import AddTenantModal from '../components/AddTenantModal';

const TenantScreen = () => {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);

  const tenantList = useSelector((state) => state.tenantList);
  const { tenants } = tenantList;

  useEffect(() => {
    dispatch(listTenants());
  }, [dispatch]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tenants</h2>
        <Button onClick={() => setShowAddModal(true)}>Add Tenant</Button>
      </div>

      <TenantList tenants={tenants} />

      <AddTenantModal show={showAddModal} onClose={() => setShowAddModal(false)} />
    </Container>
  );
};

export default TenantScreen;
