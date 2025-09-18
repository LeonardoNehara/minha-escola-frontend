import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!toggled);
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', !toggled);
  };

  return (
    <div>
      <Header onToggle={handleToggle} />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
