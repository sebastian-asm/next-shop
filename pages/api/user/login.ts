import type { NextApiRequest, NextApiResponse } from 'next';

import { compareSync } from 'bcrypt';

import { db } from '../../../database';
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
      return loginUser(req, res);

    default:
      return res.status(400).json({
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '' } = req.body;

  try {
    await db.connect();
    const user = await User.findOne({ email });

    if (!user || !compareSync(password, user.password!)) {
      throw new Error('Los datos de acceso no son válidos');
    }

    const { name, role } = user;
    res.json({
      token: '',
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
