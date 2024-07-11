import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Supprimer le token de localStorage ou sessionStorage
    localStorage.removeItem('token'); // ou sessionStorage.removeItem('token');

    // Rediriger vers la page de login
    navigate('/admin/login');
  };

  return logout;
};

export default useLogout;
