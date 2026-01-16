import { Schema, model, models } from 'mongoose';

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    }
}, { timestamps: true });

export const Message =
  models.Message || model("Message", messageSchema);

const seminarSchema = new Schema({
    seminars: [
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                required: true,
            }
    }
    ],
}, { timestamps: true });

export const Seminar =
  models.Seminar || model("Seminar", seminarSchema);

const enrollmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    photo: {
        type: String,
        required: true,
    },
    nidPhoto: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

export const Enrollment =
  models.Enrollment || model("Enrollment", enrollmentSchema);

const certificateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    studentImageUrl: {
        type: String,
    },
    certificateImageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Certificate =
  models.Certificate || model("Certificate", certificateSchema);

const resultSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    roll: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    certificate_url: {
        type: String,
    },
}, { timestamps: true });

export const Result =
  models.Result || model("Result", resultSchema);