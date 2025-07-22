import React from "react";
import Chatbot from "./components/Chatbot";
import MapContainer from "./components/MapContainer";

function App() {
  return (
    <div className="flex h-screen">
      {/* Left Chat Panel */}
      <div className="w-1/5 bg-gray-100 border-r border-gray-300">
        <Chatbot />
      </div>

      {/* Right Map & Property Panel */}
      <div className="w-4/5 relative">
        <MapContainer />
      </div>
    </div>
  );
}

export default App;
