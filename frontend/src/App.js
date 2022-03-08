import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Home from "./home/pages/Home";
import Login from "./login/pages/Login";
import Signup from "./signup/pages/Signup";
import Account from "./user/pages/Account";
import InfoUpdated from './user/pages/InfoUpdated'
import UpdateAccInfo from './user/pages/UpdateAccInfo';
import DeleteAccountWarning from './user/pages/DeleteAccountWarning'
import AccountDeleted from './user/pages/AccountDelected'
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  //////////////////// Change here for API SERVER URL ///////////////
  const API_URL = "https://www.sammul.live";
  //////////////////////////////////////////////////////////////////
  const { token, login, logout, userId, userInfo } = useAuth();
  const backendURL = 'https://www.sammul.live';
  let routes;

  if (token) {
    //routes for logged in user
    routes = (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<Account API_URL={API_URL}/>}/>
        <Route path="/updateAccInfo" element={<UpdateAccInfo API_URL={API_URL}/>}/>
        <Route path="/deleteaccountwarning" element={<DeleteAccountWarning API_URL={API_URL}/>}/>
        <Route path="/*" element={<Account API_URL={API_URL}/>}/>
      </Routes>
    );
  } else {
    //routes for public
    routes = (
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/login" element={<Login API_URL={API_URL}/>}/>
        <Route path="/signup" element={<Signup API_URL={API_URL}/>}/> 
        <Route path="/profileupdated" element={<InfoUpdated/>}/>
        <Route path="/accountdeleted" element={<AccountDeleted/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userInfo: userInfo,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
