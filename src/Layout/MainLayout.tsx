import { AnimatePresence, motion } from "framer-motion";
import {
  ChartNoAxesColumnIncreasing,
  CircleCheck,

  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import React, { useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router";
import logo from "../assets/Logo.png";
import "./scroobar.css";

/* ---------------- TYPES ---------------- */

type MenuItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

type SidebarProps = {
  items: MenuItem[];
  onClose?: () => void;
  handleLogout: () => void;
};


const paths = {
  "/dashboard": {
    title: "Dashboard",
    des: "Welcome back! Here's what's happening",
  },
  "/dashboard/user": {
    title: "User Management",
    des: "Manage users & roles",
  },
  "/dashboard/listing": {
    title: "Listing Management",
    des: "Manage listings",
  },
  "/dashboard/verification": {
    title: "Verification Requests",
    des: "Approve verification requests",
  },
 
  "/dashboard/boosted": {
    title: "Boosted Listings",
    des: "Track boosted listings",
  },

  "/dashboard/analytics": {
    title: "Analytics",
    des: "Performance insights",
  },
  "/dashboard/settings": {
    title: "Settings",
    des: "Account settings",
  },
} as const;



const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "User Management", path: "/dashboard/user" },
  { icon: CircleCheck, label: "Listings", path: "/dashboard/listing" },
  { icon: Users, label: "Verification", path: "/dashboard/verification" },
  { icon: TrendingUp, label: "Boosted", path: "/dashboard/boosted" },
  {
    icon: ChartNoAxesColumnIncreasing,
    label: "Analytics",
    path: "/dashboard/analytics",
  },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];



const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentPath = paths[location.pathname as keyof typeof paths] ?? {
    title: "Dashboard",
    des: "Dashboard",
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full bg-(--back) flex">

      {/* MOBILE OVERLAY SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-(--side) z-50 shadow-2xl p-4 lg:hidden flex flex-col h-full"
            >
              <SidebarContent
                items={menuItems}
                onClose={() => setIsSidebarOpen(false)}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex flex-col w-72 bg-(--side) border-r border-gray-700 shrink-0 h-screen">
        <SidebarContent
          items={menuItems}
          handleLogout={handleLogout}
        />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">

        {/* HEADER */}
        <header className="shrink-0 border-b border-gray-700 py-3 px-4 flex items-center justify-between bg-(--back)">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-300 hover:bg-slate-800 rounded-lg"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-white text-xl font-semibold">
                {currentPath.title}
              </h1>
              <p className="text-gray-400 text-sm hidden sm:block">
                {currentPath.des}
              </p>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 min-h-0 overflow-y-auto p-4 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>

      </div>
    </div>
  );
};



const SidebarContent = ({
  items,
  onClose,
  handleLogout,
}: SidebarProps) => {
  return (
    <div className="flex flex-col h-full bg-[#0B1120]">

      {/* LOGO */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <img src={logo} className="w-28 object-contain" />

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:text-red-400"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            onClick={() => onClose?.()}
            className={({ isActive }) =>
              isActive
                ? "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-linear-to-r from-sky-500/20 to-purple-500/10 text-white border border-sky-500/30"
                : "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}

      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 
          bg-red-500/5 border border-red-500/20 rounded-xl 
          hover:bg-red-500/10 hover:border-red-500/40 
          transition active:scale-95"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </div>
  );
};

export default MainLayout;