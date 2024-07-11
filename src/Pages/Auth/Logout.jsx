import React from 'react'
import useLogout from '../../hook/useLogout';

const Logout = () => {
    const logout = useLogout();

    useEffect(() => {
      logout();
    }, [logout]);
  
    return (
      <div>
        Logging out...
      </div>
    );
  }
  

export default Logout