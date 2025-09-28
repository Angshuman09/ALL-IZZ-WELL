import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  collegeCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    minlength: 3,
    maxlength: 10
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
 
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  establishedYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear()
  },
  collegeType: {
    type: String,
    enum: ['government', 'private', 'autonomous'],
    default: 'private'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


export const College = mongoose.model('College', collegeSchema);