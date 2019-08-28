import React, {useEffect} from 'react';
import './App.scss';
import { getCategories, getAnime }  from "./actions/index";
import { Dispatch } from 'redux';
import { connect } from "react-redux";
import mainPage from './reducers/main-page';
import Categories from "./components/categories";
import Content from "./components/content";
import SingleAnime from "./components/singleAnime";

import { Router, Route, Switch, Redirect } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { history } from "./index";
import { Link } from 'react-router-dom';


const App = (props:any) => {
  useEffect( () => {
    props.getCategories();
    // props.getAnime(props.mainPage);
  }, []);
  // console.log(props.mainPage.content);

  return (
    <div className="main">
      <h1 className="pageHeading">
        <a href="/">Anime=Life <span role="img" aria-label="Love">💗</span></a>
      </h1>
      <div className="App">
        <Router history={history} >
          <Switch>
            <Route exact path="/" render={ () => ( <Redirect to="/home"/> ) } />
            <Route path="/home" component={Content} />
            <Route path="/category/" component={Content} />
            <Route path="/error" component={() => 'NOT FOUND'} />
          </Switch>
          {/* <Categories /> */}
          <Switch>
            <Route path="/anime/" component={SingleAnime} />
            <Route path="/error" component={() => 'NOT FOUND'} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = (store:any) => { return { mainPage: store.mainPage }; };
const dispatchToProps = (dispatch:any)  => { return (
  {
    getCategories: () => { dispatch( getCategories() ); },
    getAnime: (params) => { dispatch( getAnime(params) ); }
  }
); };
export default connect (mapStateToProps, dispatchToProps)(App);
