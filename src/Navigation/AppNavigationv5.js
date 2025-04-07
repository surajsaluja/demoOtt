import React from "react";
import { BrowserRouter as Router, Switch , Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";
import DetailPage from "../components/DetailsPage/DetailPage";
import Error404 from "../components/Error404/Error404";
import VideoPlayer from "../components/VideoPlayer/VideoPlayerV2";
import SearchPage from "../components/Search/SearchPage";
const AppNavigationv5 = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/detail" component={DetailPage} />
        <Route path="/player" component={VideoPlayer} />
        <Route path="/search" component={SearchPage} />
        <Route component={HomePage} /> {/* This serves as a fallback route */}
      </Switch>
    </Router>
  );
};

export default AppNavigationv5;
