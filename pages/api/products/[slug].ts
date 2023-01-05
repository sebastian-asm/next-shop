import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = {
  ok: boolean;
  msg: string;
  product?: IProduct;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProduct(req, res);

    default:
      return res.status(400).json({
        ok: false,
        msg: 'No se puede procesar la solicitud',
      });
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { slug } = req.query;

  try {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'Producto no encontrado',
      });
    }

    res.json({
      ok: true,
      msg: 'Producto encontrado',
      product,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnect();
  }
};
