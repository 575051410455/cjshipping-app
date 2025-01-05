import { TwoFactorToken } from '@prisma/client';

import { prisma } from '@/lib/db';

export const getTwoFactorTokenByToken = async (token: string): Promise<TwoFactorToken | null> => {
  const twoFactorToken = await prisma.twoFactorToken.findUnique({
    where: { token },
  });
  return twoFactorToken;
};

export const getTwoFactorTokenByEmail = async (email: string): Promise<TwoFactorToken | null> => {
  const twoFactorToken = await prisma.twoFactorToken.findFirst({
    where: { email },
  });
  return twoFactorToken;
};
