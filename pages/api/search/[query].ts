import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
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
      return searchProducts(req, res);

    default:
      return res.status(400).json({
        ok: false,
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { query = '' } = req.query;
  query = query.toString().toLowerCase();

  try {
    if (query.length === 0)
      throw new Error('Debe especificar un término de búsqueda');

    await db.connect();
    const products = await Product.find({ $text: { $search: query } })
      .select('-_id title images price inStock slug')
      .lean();

    return res.json({
      ok: true,
      msg: 'Listado de los productos encontrados',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: (error as Error).message,
    });
  } finally {
    db.disconnect();
  }
};
