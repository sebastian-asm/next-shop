import type { NextApiRequest, NextApiResponse } from 'next';

import { hashSync } from 'bcrypt';

import { db } from '../../../database';
import { jwt, validations } from '../../../utils';
import { User } from '../../../models';

type Data =
  | { msg: string }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      return res.status(400).json({
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email = '', password = '', name = '' } = req.body as {
    email: string;
    password: string;
    name: string;
  };

  try {
    if (password.length < 4) {
      throw new Error('La contraseña debe tener mínimo 4 carácteres');
    }

    if (!validations.isValidEmail(email)) {
      throw new Error('El email no tiene un formato válido');
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('El email ya está registrado');
    }

    const newUser = new User({
      email: email.toLowerCase().trim(),
      password: hashSync(password, 10),
      role: 'client',
      name: name.trim(),
    });

    await newUser.save({ validateBeforeSave: true });

    const { _id, role } = newUser;
    const token = jwt.signToken(_id, email);

    res.json({
      token,
      user: {
        email,
        name,
        role,
      },
    });
  } catch (error) {
    res.status(404).json({
      msg: (error as Error).message,
    });
  } finally {
    await db.disconnect();
  }
};
