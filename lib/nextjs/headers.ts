import { headers } from "next/headers";

import { hashIp } from "../crypto/hash-edge-compatible";

/**
 * Retrieves and hashes the user IP from Next.js request headers
 * @returns Promise resolving to hashedIp or null if IP is not present
 */

export const getHashedUserIpFromHeaders = async (): Promise<string | null> => {
    const userIp = (await headers()).get('request-ip');
    return userIp ? await hashIp(userIp) : null;
}