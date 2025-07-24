import React, { useEffect, useState } from "react";
import Chatbot from "./components/Chatbot";
import MapContainer from "./components/MapContainer";
import type { Property } from "./data/mockListings";

declare global {
  interface Window {
    puter: any;
  }
}

function App() {
  const [results, setResults] = useState<Property[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await window.puter?.auth?.getUser();
      if (user) setIsSignedIn(true);
    };
    checkAuth();
  }, []);

  const handleSignIn = async () => {
    try {
      await window.puter.auth.signIn();
      setIsSignedIn(true);
    } catch (err) {
      console.error("Sign in failed", err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {!isSignedIn && (
        <div className="p-4 border-b bg-yellow-100 text-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSignIn}
          >
            Sign in with Puter to use AI Chat
          </button>
        </div>
      )}

      <div className="flex flex-1">
        <div className="w-1/5 bg-gray-100 border-r border-gray-300">
          <Chatbot onResults={setResults} isSignedIn={isSignedIn} />
        </div>

        <div className="w-4/5 relative">
          <MapContainer properties={results} />
        </div>
      </div>
    </div>
  );
}

export default App;
