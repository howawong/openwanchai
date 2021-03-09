import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import About from "./About";
import Index from "./Index";
import Search from "./Search";
import Detail from "./Detail";
import List from "./List";
import './App.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-191520159-1');


const history = createHistory();

history.listen( window => {
  console.log("history", window);
});


history.listen(location => {
  ReactGA.set({ page: location.pathname });
	console.log(location.pathname);
  ReactGA.pageview(location.pathname);
});

const AppRouter = () => {
	useEffect(() => {
	  console.log(location.pathname);
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, [history]);
	
  return (<Router history={history}>
    <div id="router">
	  <Route path="/" exact component={Index} />
	  <Route path="/search" exact component={Search} />
	  <Route path="/list" exact component={List} />
	  <Route path="/about" exact component={About} />
	  <Route path="/detail/:id" exact component={Detail} />
	</div>
  </Router>
)};

export default AppRouter;
