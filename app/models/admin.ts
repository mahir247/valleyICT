import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/app/lib/mongodb';

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = (mongoose.models.Admin as mongoose.Model<any>) || mongoose.model('Admin', AdminSchema);

export default Admin;

// Ensure there is at least one admin (default: admin/admin)
export async function getOrCreateDefaultAdmin() {
  await connectToDatabase();
  let admin = await Admin.findOne();
  if (!admin) {
    const hashed = await bcrypt.hash('admin', 10);
    admin = await Admin.create({ username: 'admin', password: hashed });
  }
  return admin;
}