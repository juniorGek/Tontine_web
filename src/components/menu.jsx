import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const getMenu = (user) => {
  const baseMenu = [
    { title: 'dashboard', icon: <AiFillDashboard />, route: '/admin/dashboard' },
    { title: 'utilisateur', route: '/admin/user', icon: <FaRegUser /> },
    { title: 'Agent', spacing: true, route: '/admin/profile_agent' },
    {
      title: 'Projects',
      submenu: true,
      route: '/projects',
      menuitem: [
        { title: 'submenu1', route: '/projects/submenu1' },
        { title: 'submenu2', route: '/projects/submenu2' },
        { title: 'submenu3', route: '/projects/submenu3' },
      ],
    },
    { title: 'Statistics', icon: <IoIosStats />, route: '/statistics' },
    { title: 'Inbox', route: '/inbox' },
    { title: 'Profile', icon: <CgProfile />, spacing: true, route: '/profile' },
    { title: 'Settings', icon: <IoSettings />, route: '/settings' },
    { title: 'Logout', icon: <TbLogout2 />, route: '/admin/logout' },
  ];

  return baseMenu.map(item => {
    if (item.title === 'Profile') {
      if (user === 'superAdmin') {
        return { ...item, title: 'Parametre' };
      } else if (user === 'Admin') {
        return { ...item, title: 'Admin' };
      } else {
        return null; // Remove the item if the user is neither superAdmin nor Admin
      }
    }
    return item;
  }).filter(Boolean); // Remove any null items
};

export default getMenu;
