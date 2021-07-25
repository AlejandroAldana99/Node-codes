var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemData = new Schema({
    service:          { type: String },
    service_type:     { type: String },
    service_sub_type: { type: String },
    description:      { type: String },
    price_usd:        { type: Number },
    price_mxn:        { type: Number }
});

const quotetable = new Schema({
    quoteID:           { type: Number, unique: true },
    subtotal:          { type: Number },
    sales_tax:         { type: Number },
    contact_name:      { type: String },
    email:             { type: String },
    phone:             { type: String },
    company:           { type: String },
    prepared_date:     { type: String, maxlength: 20 },
    expiration_date:   { type: String, maxlength: 20 },
    contact:           { type: String },
    preparer:          { type: String },
    payment:           { type: String },
    address:           { type: Object },
    selected_services: [itemData]
});

quotetable.set('toJSON', { virtuals: true, versionKey: false,
    transform: function (doc, ret) { //removes the _id property so they are not included in API responses.
        delete ret._id;
    }
});

module.exports = user_conn.model('Quotetable', quotetable);