import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";

import './App.css'
import Home from './components/Home/Home';
import Room from './components/Room/Room';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;


const App = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
    publishableKey={clerkPubKey}
    navigate={(to) => navigate(to)}
    >
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in/*"
            element={ 
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                 <RedirectToSignIn />
              </SignedOut>
            </>
          }/>

          {/* <Route path="/:id" element={<Room />} /> */}
        </Routes>
      </div>
    </ClerkProvider>
  );
};

export default App
