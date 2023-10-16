const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    desc: {
      type: Object,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },

    manifucturer_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    discount_id: {
      type: Schema.Types.ObjectId,
    },

    created_at: {
      type: String,
      required: true,
    },

    updated_at: {
      type: String,
      required: true,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
