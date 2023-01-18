import { model, Model, models, Schema } from 'mongoose';

import { IUser } from '../interfaces';

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client'],
        message: '{VALUE} no es un rol válido',
        default: 'client',
        require: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<IUser> = models.User || model('User', userSchema);

export default User;
