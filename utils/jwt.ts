import { sign } from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('Ocurrio un problema con JWT');
  }
  return sign({ _id, email }, process.env.JWT_SECRET_SEED, {
    expiresIn: '5d',
  });
};
