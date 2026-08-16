import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    fullName: string;
    companyName: string;
    email: string;
    phone: string;
    country: string;
    service: string;
    message: string;
    consent: boolean;
    status: "pending" | "contacted" | "completed";
    createdAt: Date;
    updatedAt: Date;
}

const ContactSchema = new Schema<IContact>({
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    consent: { type: Boolean, default: false },
    status: {
        type: String,
        enum: ["pending", "contacted", "completed"],
        default: "pending",
    },
}, {
    timestamps: true,
});

export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);