import { prisma } from '@/lib/db';

export const deletePasswordResetTokenById = async (tokenId: string): Promise<void> => {
  await prisma.passwordResetToken.delete({
    where: { id: tokenId },
  });
};
