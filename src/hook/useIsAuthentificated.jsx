// auth.js
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // exp est en secondes, donc multiplier par 1000 pour obtenir les millisecondes
    return Date.now() >= expirationTime;
  } catch (error) {
    return false; // Si le token est mal formé ou ne peut pas être décodé, considérez-le comme expiré
  }
};


export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  if (isTokenExpired(token)) return null;
  return jwtDecode(token);
};
