export const login = (email, password) => {
  const valid = email === 'admin@book.com' && password === 'admin123';
  if (valid) localStorage.setItem('user', 'admin');
  return valid;
};

export const logout = () => localStorage.removeItem('user');
export const isLoggedIn = () => !!localStorage.getItem('user');
