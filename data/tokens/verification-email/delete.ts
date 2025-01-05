import { prisma } from '@/lib/db';

export const deleteCustomVerificationTokenById = async (tokenId: string): Promise<void> => {
  await prisma.customVerificationToken.delete({
    where: { id: tokenId },
  });
};
