import type { NextApiRequest, NextApiResponse } from 'next';

import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = {
  ok: boolean;
  msg: string;
  products?: IProduct[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);

    default:
      return res.status(400).json({
        ok: false,
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { gender = 'all' } = req.query;
  let query = {};

  if (
    query !== 'all' &&
    SHOP_CONSTANTS.validGenders.includes(gender as string)
  ) {
    query = { gender };
  }

  try {
    await db.connect();
    const products = await Product.find(query)
      .select('-_id title images price inStock slug')
      .lean();

    res.json({
      ok: true,
      msg: 'Listado de todos los productos',
      products,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }
};
