import React, { useEffect } from 'react';
import SideBar from '../global/SideBar';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWelcome } from '../../../hook/WelcomeContext';

const Agent = ({ user }) => {

  const { welcomeMessage, setWelcomeMessage } = useWelcome();


  const navigate = useNavigate();
  const handleAgent= ()=>{
    navigate('/admin/add_agent')
  }

  useEffect(() => {
    if (welcomeMessage) {
      toast.success(welcomeMessage);
      setWelcomeMessage(""); // Reset the welcome message
    }
  }, [welcomeMessage, setWelcomeMessage]);



  return (
    <div className="">
      <SideBar user={user}>
      <ToastContainer position="top-right" />
        <div className='flex p-5'>
          <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-full rounded-xl bg-clip-border">
            <h1 className="text-xl font-bold p-4 text-center">Liste des agents</h1>
            <div className="flex justify-between items-center px-4 py-2">
              <button
                className="h-10 px-4 rounded-lg text-center align-middle font-sans text-lg font-medium uppercase text-white bg-green-500 transition-all hover:bg-green-950 active:bg-green-700"
                type="button"
                onClick={handleAgent}
              >
                Ajouter agent
              </button>
              <input
                type="text"
                placeholder="Rechercher"
                className="h-12 w-68 px-4 rounded-lg font-sans text-base text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <nav className="flex flex-col gap-4 p-4 font-sans text-base font-normal text-blue-gray-700">
              {[
                { name: 'Nom Agent 1', email: 'email.agent1@example.com' },
                { name: 'Nom Agent 2', email: 'email.agent2@example.com' },
                { name: 'Nom Agent 3', email: 'email.agent3@example.com' },
              ].map((agent, index) => (
                <div
                  key={index}
                  role="button"
                  className="flex items-center justify-between w-full p-4 leading-tight transition-all rounded-lg outline-none text-start bg-white shadow hover:bg-blue-100 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900 active:bg-blue-100 active:text-blue-900"
                >
                  <div className="flex flex-col">
                    <div className="font-bold">{agent.name}</div>
                    <div className="text-sm text-gray-500">{agent.email}</div>
                  </div>
                  <button
                    className="relative h-10 max-h-[40px] w-24 max-w-[100px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white bg-blue-500 transition-all hover:bg-blue-600 active:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Détails
                  </button>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default Agent;
