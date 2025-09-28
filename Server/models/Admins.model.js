import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,'Username is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: [true,"password is required"],
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: [true,'email is required'],
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'admin'],
    required: true
  },

  collegeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: function() {
      return this.role === 'admin';
    }
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: function() {
      return this.role === 'admin';
    }
  },

}, {
  timestamps: true
});


adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(`error in hashing the password: ${error}`);
  }

});

adminSchema.methods.comparePassword =async function(adminPassword) {
  return bcrypt.compare(adminPassword, this.password);
};


export const Admin = mongoose.model('Admin', adminSchema);