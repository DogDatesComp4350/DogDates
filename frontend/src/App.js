import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Home from "./home/pages/Home";
import Login from "./login/pages/Login";
import Signup from "./signup/pages/Signup";
import Account from "./account/pages/Account";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg"
              name="homePageDogsImage"
            />
          }
        />
        <Route path="/account" element={<Account />} />
        {/* <Route path="/*" element={<Account />} />  Uncomment to redirect to Account Page if route is not exits*/}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              image="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_28/1587661/dogs-age-years-kb-inline-200707.jpg"
              name="homePageDogsImage"
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/*" element={<Home />} Uncomment to redirect to Home Page if route is not exits/> */}
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
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
