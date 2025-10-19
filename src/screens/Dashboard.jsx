import React from "react";
import Navbar from "../components/Navbar";
import Save_history from "../components/Save_history";
import ChatApp from "../components/ChatApp";

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Save_history />
        <div style={{ flex: 1, display: 'flex' }}>
          <ChatApp />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;