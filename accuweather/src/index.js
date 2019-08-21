import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import Reducer from "./reducers/reducer";
const store = createStore( Reducer,  applyMiddleware(thunk) );

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
