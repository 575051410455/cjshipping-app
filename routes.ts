/**
 *  An array of routes that are accessible to the public
 *  These routes do not require authentication
 *  @type {string[]}
*/
export const publicRoutes = [
    "/",
    "/new-verification",
    
];

/**
 *  An array of routes that are user for authentication
 *  These routes will redirect logged in users to /settings
 *  @type {string[]}
*/

export const authRoutes = [
    "/login",
    "/register",
    "/error",
    "/reset-pasword",
    "/new-password",
    "/login/magic-link",
];

/**
 *  The prefix for API authentication routes
 *  Routes that start with this prefix are used for API authentication purposes
 *  @type {string[]}
*/
export const apiAuthPrefix = "/api/auth/";

/**
 *  The default redirect path after loggin in
 *  authentication purposes
 *  @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * Default Allowed Redirects from callbackUrl searchParams
 * @type {string}
 */
export const ALLOWED_REDIRECTS = ['/server', '/admin', '/client', '/settings'];
