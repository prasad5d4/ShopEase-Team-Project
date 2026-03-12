// ══════════════════════════════════════════════
// AUTH SERVICE — Member 8
// Handles JWT token storage and retrieval
// Backend: POST /api/user/login
//          POST /api/user/register
// ══════════════════════════════════════════════

const TOKEN_KEY = "shopease_jwt";
const USER_KEY  = "shopease_user";

const AuthService = {
  /**
   * Store JWT token after successful login
   * @param {string} token - JWT token from backend
   * @param {object} user  - { username, role }
   */
  setToken(token, user) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /** Get stored JWT token */
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  /** Get stored user object */
  getUser() {
    const u = sessionStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  },

  /** Check if user is authenticated */
  isAuthenticated() {
    return !!this.getToken();
  },

  /** Remove token on logout */
  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  /**
   * Simulate login — replace with real API call:
   * const res = await HttpService.post("/api/user/login", { username, password });
   * this.setToken(res.data.token, res.data.user);
   */
  async login(username, password) {
    // Simulate JWT token generation
    const fakeToken = btoa(JSON.stringify({ sub: username, iat: Date.now(), exp: Date.now() + 3600000 }));
    const roles = { customer1:"CUSTOMER", seller1:"SELLER", admin1:"ADMIN" };
    const passwords = { customer1:"pass123", seller1:"pass123", admin1:"pass123" };

    if (passwords[username] && passwords[username] === password) {
      const user = { username, role: roles[username] };
      this.setToken(fakeToken, user);
      return { success: true, user };
    }
    return { success: false, message: "Invalid credentials" };
  },

  /**
   * Simulate register — replace with real API call:
   * const res = await HttpService.post("/api/user/register", { username, email, password, role });
   */
  async register(username, email, password, role) {
    if (!username || !email || !password) {
      return { success: false, message: "All fields are required" };
    }
    // In production: call backend and await confirmation
    return { success: true, message: "Registration successful" };
  },
};

export default AuthService;
