import { model, Model, models, Schema } from 'mongoose';

import { IProduct } from '../interfaces';

const productSchema = new Schema(
  {
    description: { type: String, require: true },
    images: [{ type: String }],
    inStock: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    sizes: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} no es un valor válido',
        },
      },
    ],
    slug: { type: String, require: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, require: true },
    type: {
      type: String,
      enum: {
        values: ['shirts', 'pants', 'hoodies', 'hats'],
        message: '{VALUE} no es un valor válido',
      },
    },
    gender: {
      type: String,
      enum: {
        values: ['men', 'women', 'kid', 'unisex'],
        message: '{VALUE} no es un valor válido',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// creando un indice para la busqueda por terminos
productSchema.index({ title: 'text', tags: 'text' });

const Product: Model<IProduct> =
  models.Product || model('Product', productSchema);

export default Product;
