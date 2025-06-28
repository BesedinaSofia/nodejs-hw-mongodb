// import mongoose from "mongoose";

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       required: true,
//       enum: ["work", "home", "personal"], 
//     },
//   },
//   { timestamps: true }
// );

// const Contact = mongoose.model("Contact", contactSchema);
// export default Contact;
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    contactType: {
      type: String,
      enum: ['personal', 'work', 'home'],
      default: 'personal',
    },
    isFavourite: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
