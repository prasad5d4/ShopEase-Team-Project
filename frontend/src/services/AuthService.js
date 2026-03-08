const USERS_KEY = "shopease_users";

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const defaultAdmin = {
    id: 1,
    username: "admin",
    email: "admin@shopease.com",
    password: "admin123",
    role: "ADMIN"
  };

  const adminExists = users.some((user) => user.username === "admin");

  if (!adminExists) {
    users.push(defaultAdmin);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  return users;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const register = async (userData) => {
  const users = getUsers();

  const existingUser = users.find(
    (user) =>
      user.username === userData.username || user.email === userData.email
  );

  if (existingUser) {
    throw {
      response: {
        data: {
          message: "User already exists with this username or email"
        }
      }
    };
  }

  const newUser = {
    id: Date.now(),
    username: userData.username,
    email: userData.email,
    password: userData.password,
    role: userData.role
  };

  users.push(newUser);
  saveUsers(users);

  return {
    message: "Registration successful"
  };
};

const login = async (credentials) => {
  const users = getUsers();

  const user = users.find(
    (u) =>
      u.username === credentials.username &&
      u.password === credentials.password
  );

  if (!user) {
    throw {
      response: {
        data: {
          message: "Invalid username or password"
        }
      }
    };
  }

  const fakeToken = "demo-token-" + user.id;

  localStorage.setItem("token", fakeToken);
  localStorage.setItem("role", user.role);
  localStorage.setItem("username", user.username);
  localStorage.setItem("userId", user.id);

  return {
    token: fakeToken,
    role: user.role,
    username: user.username,
    userId: user.id
  };
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
};

const getRole = () => localStorage.getItem("role");
const isLoggedIn = () => !!localStorage.getItem("token");

export default {
  register,
  login,
  logout,
  getRole,
  isLoggedIn
};