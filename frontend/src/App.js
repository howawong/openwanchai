import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./Index";
import Search from "./Search";
import Detail from "./Detail";
import List from "./List";
import './App.css';



const AppRouter = () => (
  <Router>
    <div id="router">
	  <Route path="/" exact component={Index} />
	  <Route path="/search" exact component={Search} />
	  <Route path="/list" exact component={List} />
	  <Route path="/detail/:id" exact component={Detail} />
	</div>
  </Router>
);

export default AppRouter;
