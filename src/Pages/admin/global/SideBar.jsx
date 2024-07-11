import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsArrowLeftShort, BsSearch, BsChevronDown } from "react-icons/bs";
import { AiFillBook } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";

import getMenu from "../../../components/menu";

const SideBar = ({ user, children }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubMenuOpen] = useState(false);
  const menu = getMenu(user);
  const navigate = useNavigate();

  const handleLogout = async() => {
   await localStorage.removeItem('token'); // Remplacez 'token' par le nom de votre token

    console.log("User logged out");
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen ">
      <div
        className={`bg-dark-puples h-full p-5 ${open ? "w-72" : "w-20"} 
              duration-300 relative flex flex-col  `}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-puples rounded-full text-3xl
                  absolute -right-3 top-9 border-dark-puples border cursor-pointer ${
                    !open && "rotate-180"
                  } `}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <AiFillBook
            className="text-3xl bg-amber-300 
                  rounded cursor-pointer block float-left mr-5"
          />
          <h1
            className={`text-white font-sans origin-left 
                      font-medium duration-500 ${!open && "scale-0"}`}
          >
            Bookmak
          </h1>
        </div>

        <div
          className={`flex items-center rounded-lg bg-rgba mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2 `}
        >
          <BsSearch
            className={`text-black text-lg float-left cursor-pointer ${
              open && "mr-2"
            }  `}
          />
          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent 
                  w-full text-white focus:outline-none ${!open && "hidden"} `}
          />
        </div>
        <ul className="pt-2">
          {menu.map((menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`text-gray-300 flex text-sm items-center gap-x-4
                              cursor-pointer p-2 hover:bg-rgba rounded-md ${
                                menu.spacing ? "mt-5" : "mt-2"
                              } `}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RxDashboard />}
                </span>
                {menu.title === "Logout" ? (
                  <button
                    onClick={handleLogout}
                    className={`font-medium text-base flex-1 ${
                      !open && "hidden"
                    } px-2 py-2 rounded-md transition-all duration-500 hover:bg-gray-700`}
                  >
                    {menu.title}
                  </button>
                ) : (
                  <NavLink
                    to={menu.route}
                    className={({ isActive }) =>
                      `font-medium text-base flex-1 ${
                        !open && "hidden"
                      } px-2 py-2 rounded-md transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg transform scale-105"
                          : "hover:bg-gray-700"
                      }`
                    }
                  >
                    {menu.title}
                  </NavLink>
                )}
                {menu.submenu && open && (
                  <BsChevronDown
                    className={`${submenuOpen && "rotate-180"}`}
                    onClick={() => setSubMenuOpen(!submenuOpen)}
                  />
                )}
              </li>
              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.menuitem.map((submenu, index) => (
                    <li
                      key={index}
                      className={`text-gray-300 flex text-sm items-center gap-x-4
                                      cursor-pointer p-2 px-5 hover:bg-rgba rounded-md`}
                    >
                      <NavLink
                        to={submenu.route}
                        className={({ isActive }) =>
                          `font-medium text-base flex-1 ${
                            !open && "hidden"
                          } px-2 py-2 rounded-md transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500 p-2 to-blue-700 text-white shadow-lg transform scale-105"
                              : "hover:bg-gray-700"
                          }`
                        }
                      >
                        {submenu.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="flex-1 ">
        {children}
      </div>
    </div>
  );
};

export default SideBar;
