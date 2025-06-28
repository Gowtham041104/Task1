const Tenant = require('../models/Tenant');

// Get all tenants
exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find().populate('subscribedProducts');
    res.json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    res.status(500).json({ message: 'Failed to fetch tenants' });
  }
};

// Create a tenant
exports.createTenant = async (req, res) => {
  try {
    const { name, email, phone, domain, status, plan, subscribedProducts } = req.body;

    // Check if email already exists
    const existing = await Tenant.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Tenant with this email already exists' });
    }

    const tenant = new Tenant({
      name,
      email,
      phone,
      domain,
      status,
      plan,
      subscribedProducts,
    });

    await tenant.save();
    res.status(201).json(tenant);
  } catch (error) {
    console.error('Error creating tenant:', error);
    res.status(500).json({ message: 'Failed to create tenant' });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, domain, status, plan, subscribedProducts } = req.body;

    const tenant = await Tenant.findByIdAndUpdate(
      id,
      { name, email, phone, domain, status, plan, subscribedProducts },
      { new: true }
    );

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    res.json(tenant);
  } catch (error) {
    console.error('Error updating tenant:', error);
    res.status(500).json({ message: 'Failed to update tenant' });
  }
};

// Delete tenant
exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting tenant:', error);
    res.status(500).json({ message: 'Failed to delete tenant' });
  }
};
