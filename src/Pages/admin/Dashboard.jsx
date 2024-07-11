import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWelcome } from '../../hook/WelcomeContext';
import SideBar from './global/SideBar';


const Dashboard = ({ user }) => {
  const { welcomeMessage, setWelcomeMessage } = useWelcome();

  useEffect(() => {
    if (welcomeMessage) {
      toast.success(welcomeMessage);
      setWelcomeMessage(''); // Reset the welcome message
    }
  }, [welcomeMessage, setWelcomeMessage]);



  return (
    <div>
      <ToastContainer position="top-right" />
      <SideBar user={user}>
       
        <h1>Dashboard</h1>
        <p>Type d'utilisateur : {user}</p>

      </SideBar>
      
      
    </div>
  )
}

export default Dashboard