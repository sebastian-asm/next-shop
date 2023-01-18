import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { jwt } from '../../../utils';
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
    case 'GET':
      return checkJWT(req, res);

    default:
      return res.status(400).json({
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.headers;
  let userId = '';

  try {
    userId = await jwt.isValidToken(token as string);

    await db.connect();
    const user = await User.findById(userId).lean();
    if (!user) throw new Error('No existe el usuario');

    const { _id, email, role, name } = user;
    const newToken = jwt.signToken(_id, email);

    res.json({
      token: newToken,
      user: {
        email,
        role,
        name,
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
