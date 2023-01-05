import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  ok: boolean;
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(400).json({
    ok: false,
    msg: 'Debe especificar un término de búsqueda',
  });
}
