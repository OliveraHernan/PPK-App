import type { NextApiRequest, NextApiResponse } from 'next';

const validCodes = ['123456', 'abcdef'];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;

    if (validCodes.includes(code)) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(401).json({ valid: false, message: 'Código inválido' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
}
