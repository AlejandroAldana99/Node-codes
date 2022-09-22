import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Issuer Helper Schema
const issuersSchema = new Schema({
    issuer_name:  { type: String, required: false },
    total_shares: { type: Number, required: false },
    share_price:  { type: Number, required: false }
},
    {
        timestamps: true
    }
);

// Operation helper Schema
const operationSchema = new Schema({
    issuer_name: { type: String, required: false },
    timestamp:   { type: Number, required: false },
},
    {
        timestamps: true
    }
);

// Main Schema
const accountSchema = new Schema({
    id:             { type: Number,  required: false },
    cash:           { type: Number,  required: true },
    issuers:        [issuersSchema],
    last_operation: operationSchema,
},
    {
        timestamps: true
    }
);

// Collection definition
const accountModel = mongoose.model('account', accountSchema, 'accounts');

export default accountModel;
