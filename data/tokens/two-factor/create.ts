import crypto from 'crypto';

import { TwoFactorToken } from '@prisma/client';

import { getTwoFactorTokenByEmail } from '@/data/tokens/two-factor/helpers';
import { prisma } from '@/lib/db';

export const generateTwoFactorToken = async (email: string, userId: string): Promise<TwoFactorToken> => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1hr

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
      userId,
    },
  });

  return twoFactorToken;
};
