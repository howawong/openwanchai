import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from "./Index";
import Search from "./Search";


const AppRouter = () => (
  <Router>
    <div>
	  <Route path="/" exact component={Index} />
	  <Route path="/search" exact component={Search} />
	</div>
  </Router>
);

export default AppRouter;
