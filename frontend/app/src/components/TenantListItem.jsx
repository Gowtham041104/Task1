import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TenantListItem = ({ tenant, onManage, getPlanBadge, onDelete }) => {
  return (
    <tr>
      <td><strong>{tenant.name}</strong></td>
      <td className="text-muted small">{tenant.email || `admin@${tenant.domain}`}</td>
      <td>{getPlanBadge(tenant.plan)}</td>
      <td>
        {tenant.isActive ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Inactive</Badge>}
      </td>
      <td>{tenant.subscribedProducts?.length || 0}</td>
      <td>
        <Button size="sm" variant="outline-primary" onClick={() => onManage(tenant)}>Manage</Button>{' '}
        <Link to={`/products?tenantId=${tenant._id}`}>
          <Button size="sm" variant="outline-success">Products</Button>
        </Link>{' '}
        <Button size="sm" variant="outline-danger" onClick={() => onDelete(tenant._id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default TenantListItem;
