import { prisma } from '@/lib/db';

export const getCustomVerificationTokenByToken = async (token: string) => {
  const customVerificationToken = await prisma.customVerificationToken.findUnique({
    where: { token },
  });
  return customVerificationToken;
};
