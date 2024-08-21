import { useState } from "react";

import Nav from "./components/nav";
import Main from "./components/main";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home";
import Contact from "./Pages/Contact";
import Header from "./components/header";
import About from "./Pages/About";
import Service from "./Pages/Service";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/register";
import Dashboard from "./Pages/admin/Dashboard";
import ProtectedRoute from "./hook/ProtectedRoute";
import PublicRoute from "./hook/PublicRoute";
import User from "./Pages/admin/Screens/User";
import AddUser from "./Pages/admin/Screens/AddUser";
import Logout from "./Pages/Auth/Logout";
import Agent from "./Pages/admin/Screens/Agent";
import AddAgent from "./Pages/admin/Screens/AddAgent";
import DetailAgent from "./Pages/admin/Screens/DetailAgent";
import NewClient from "./Pages/admin/Screens/Client/NewClient";
import Client from "./Pages/admin/Screens/Client/Client";
import WaitClient from "./Pages/admin/Screens/Client/WaitClient";
import FonctionList from "./Pages/admin/Screens/Fonctions/FonctionList";
import AfterRegister from "./Pages/Auth/AfterRegister";
import DetailClient from "./Pages/admin/Screens/Client/DetailClient";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/contact" index element={<Contact />} />
        <Route path="/about" index element={<About />} />
        <Route path="/service" index element={<Service />} />
        <Route path="/register" index element={<Register />} />
        <Route path="/after" index element={<AfterRegister />} />

        <Route
          path="/admin/login"
          index
          element={<PublicRoute element={<Login />} />}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/admin/user"
          element={<ProtectedRoute element={<User />} />}
        />
        <Route
          path="/admin/addUser"
          element={<ProtectedRoute element={<AddUser />} />}
        />

        <Route
          path="/admin/profile_agent"
          element={<ProtectedRoute element={<Agent />} />}
        />

        <Route
          path="/admin/add_agent"
          element={<ProtectedRoute element={<AddAgent />} />}
        />

        <Route
          path="/admin/detailAgent/:id"
          element={<ProtectedRoute element={<DetailAgent />} />}
        />
        <Route
          path="/admin/client/new"
          element={<ProtectedRoute element={<NewClient />} />}
        />
        <Route
          path="/admin/client/waitClient"
          element={<ProtectedRoute element={<WaitClient />} />}
        />
        <Route
          path="/admin/client"
          element={<ProtectedRoute element={<Client />} />}
        />

        <Route
          path="/admin/detailClient/:id"
          element={<ProtectedRoute element={<DetailClient />} />}
        />

        <Route
          path="/admin/Fonctions"
          element={<ProtectedRoute element={<FonctionList />} />}
        />

        <Route
          path="/admin/logout"
          element={<ProtectedRoute element={<Logout />} />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
