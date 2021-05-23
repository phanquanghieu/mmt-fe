import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { Header } from "./components/layout";
import ReactLoading from "react-loading";
import AuthContext from "./contexts/auth";
import { useAsync } from "react-hook-async";
import { Dashboard } from "./components/dashboard";
import HomePage from "./components/homepage";
import AddForm from "./components/setCard/addSetCard";
import EditForm from "./components/setCard/editSetCard";
import DetailSet from "./components/setCard/detailSetCard";
import { me } from "./api/profile";
import Setting from "./components/setting";
import Profile from "./components/setting/profile";
import Auth from "./components/auth/index";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const [profileApi, fetchProfile] = useAsync(null, me);
  useEffect(() => {
    if (!authUser) {
      const jwt = localStorage.getItem("jwt");
      const ss = localStorage.getItem("session");
      if (jwt !== null && jwt) {
        console.log("here" + jwt + "1");
        fetchProfile(jwt).then((user) => setAuthUser(user));
      } else if (ss) {
        console.log("here" + ss);
        fetchProfile(ss).then((user) => setAuthUser(user));
      }
    }
  }, [authUser, fetchProfile, setAuthUser]);

  if (profileApi.loading) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#ffa5ab" />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/flashcard/new" component={AddForm} />
          <Route path="/flashcard/edit/:slug" component={EditForm} />
          <Route path="/setCard/:slug" component={DetailSet} />
          <Route path="/setting" component={Setting} />
          <Route path="/auth" component={Auth} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
