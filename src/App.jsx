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


function App() {
  return (
    <>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/contact" index element={<Contact />} />
        <Route path="/about" index element={<About />} />
        <Route path="/service" index element={<Service />} />
        <Route path="/register" index element={<Register />} />
        
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

        <Route path="/admin/logout" element={<ProtectedRoute element={<Logout />} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
