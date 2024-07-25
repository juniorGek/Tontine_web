import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdRealEstateAgent } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";


const getMenu = (user) => {
  const baseMenu = [
    { title: 'dashboard', icon: <AiFillDashboard />, route: '/admin/dashboard' },
    { title: 'utilisateur', route: '/admin/user', icon: <FaRegUser /> },
    { title: 'Agent', spacing: true, icon: <MdRealEstateAgent /> ,route: '/admin/profile_agent' },
    { title: 'Tontine', icon: <TbPigMoney />, route: '/settings' },
    {
      title: 'Client',
      submenu: true,
      route: '/admin/client',
      icon: <FaPersonChalkboard />,
      menuitem: [
        { title: 'Nouveau inscription', route: '/admin/client/new' },
        { title: 'Inscription en attente', route: '/projects/submenu2' },
        { title: 'Cotisations', route: '/projects/submenu3' },
      ],
    },
    { title: 'Compte', icon: <FaMoneyBillTransfer />, spacing: true, route: '/profile' },
    { title: 'Statistics', icon: <IoIosStats />, route: '/statistics' },
    { title: 'Inbox', route: '/inbox' },
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
