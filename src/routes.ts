/**
 * An array of routes that are not protected by the middleware.
 * @type {string[]}
 */

export const publicRoutes = ["/", "/products", "/hello"];

/**
 * An array of routes that are protected by the middleware.
 * @type {string[]}
 */

export const protectedRoutes = [
  "/settings",
  "/protected",
  "/dashboard",
  "/payments",
];

/**
 * An array of authentication-related route paths.
 *
 * This array contains the paths for login, registration, and error handling
 * within the authentication module of the application.
 *
 * @constant {string[]} authRoutes - The array of authentication route paths.
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * The prefix for API authentication routes.
 * These routes will be used for authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";
