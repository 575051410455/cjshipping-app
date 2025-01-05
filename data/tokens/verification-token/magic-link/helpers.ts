import { CustomMagicLinkError } from "@/lib/constants/errors/errors";
import { prisma } from "@/lib/db";

export async function validateMagicLinkRequest(email: string, hashedIp: string) {
    // Check IP limit
    const activeTokenCountSameIp = await prisma.verificationToken.count({
        where: {
            hashedIp,
            expires: { gt: new Date() },
        },
    });

    if (activeTokenCountSameIp >= 2) {
        throw new CustomMagicLinkError('IpInvalid');
    }

    // Check for existing token
    const existingToken = await prisma.verificationToken.findFirst({
        where: {
            identifier: email,
            expires: { gt: new Date() },
        },
    });

    if (existingToken) {
        throw new CustomMagicLinkError('TokenExists');
    }
}

export async function cleanupExpiredVerificationTokens() {
    await prisma.verificationToken.deleteMany({
        where: {
            expires: { lt: new Date() },
        }
    })
}