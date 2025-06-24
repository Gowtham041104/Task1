const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  domain: {
    type: String, // ✅ Add this
  },
  adminEmail: {
    type: String, // ✅ Add this
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active', // ✅ Add this
  },

}, { timestamps: true });

module.exports = mongoose.model('Tenant', tenantSchema);
