import { sign, verify } from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Ocurrio un problema con JWT');
  }
  return sign({ _id, email }, process.env.NEXTAUTH_SECRET, {
    expiresIn: '5d',
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.NEXTAUTH_SECRET) {
    throw new Error('Ocurrio un problema con JWT');
  }
  return new Promise((resolve, reject) => {
    verify(token, process.env.NEXTAUTH_SECRET || '', (error, decoded) => {
      if (error) throw reject(new Error('El token no es válido'));
      const { _id } = decoded as { _id: string };
      resolve(_id);
    });
  });
};
