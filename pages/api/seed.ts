import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../database';
import { initialData } from '../../database/products';
import { Product } from '../../models';

type Data = {
  ok: boolean;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === 'production') {
    return res
      .status(401)
      .json({ ok: false, msg: 'No tiene acceso a esta API' });
  }

  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(initialData.products);

    res.status(201).json({
      ok: true,
      msg: 'Datos creados exitosamente',
    });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }
}
