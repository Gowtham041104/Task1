import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ManageTenantModal = ({ tenant, show, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    email: '',
    isActive: true,
    plan: 'Free',
  });

  useEffect(() => {
    if (tenant) {
      const domain = tenant.domain || '';
      setFormData({
        name: tenant.name || '',
        domain,
        email: tenant.email || `admin@${domain}`,
        isActive: tenant.isActive !== undefined ? tenant.isActive : true,
        plan: tenant.plan || 'Free',
      });
    } else {
      setFormData({
        name: '',
        domain: '',
        email: '',
        isActive: true,
        plan: 'Free',
      });
    }
  }, [tenant, show]); // Reset form when modal opens

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === 'isActive') {
        return { ...prev, isActive: value === 'true' };
      }
      if (name === 'domain') {
        return { ...prev, domain: value, email: `admin@${value}` };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tenant && tenant._id) {
      onUpdate(tenant._id, formData);
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{tenant ? 'Edit Tenant' : 'Add Tenant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Domain</Form.Label>
            <Form.Control
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Plan</Form.Label>
            <Form.Select name="plan" value={formData.plan} onChange={handleChange}>
              <option value="Free">Free</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="isActive"
              value={formData.isActive ? 'true' : 'false'}
              onChange={handleChange}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {tenant ? 'Save Changes' : 'Add Tenant'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ManageTenantModal;
