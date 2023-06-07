import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Routes, Route, Link, useNavigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";

import { logout } from "./actions/auth";

import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import NewAddress from "./components/addresses/NewAddress";
import ListAddress from "./components/addresses/ListAddress";
import UpdateAddress from "./components/addresses/UpdateAddress";
import NewContact from "./components/contact/NewContact";
import ListContact from "./components/contact/ListContact";
import UpdateContact from "./components/contact/UpdateContact";
import NewVisit from "./components/visits/NewVisit";



const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [commercialDirector, setCommercialDirector] = useState();
  let navigate = useNavigate();

  const logOut = (e) => {
    dispatch(logout()).then(() => {
      navigate("/");
      window.location.reload();
    });
  }

  useEffect(() => {

    if (currentUser && currentUser.role && currentUser.role.includes('commercialDirector')) {
      setCommercialDirector(true);
    } else {
      setCommercialDirector(false);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Flutilient
        </Link>
        {currentUser ? (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/visits"} className="nav-link">
                Visits
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/address"} className="nav-link">
                Addresses
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Contacts
              </Link>
            </li>
            {commercialDirector ? (
                <li className="nav-item">
                  <Link to={"/dashboard"} className="nav-link">
                    Dashboard
                  </Link>
                </li>
            ) : ''
            }
          </div>
        ) : '' }


        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <span className="navbar-text">
              {currentUser.email}
            </span>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/address/new" element={<NewAddress />} />
          <Route path="/address/:id" element={<UpdateAddress />} />
          <Route path="/address" element={<ListAddress />} />
          <Route path="/contact/new" element={<NewContact />} />
          <Route path="/contact/:id" element={<UpdateContact />} />
          <Route path="/contact" element={<ListContact />} />
          <Route path="/visit/new" element={<NewVisit />} />
        </Routes>
      </div>

       <AuthVerify logOut={logOut}/>
    </div>
  );
};

export default App;
