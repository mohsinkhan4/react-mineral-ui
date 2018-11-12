import React from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { Provider } from "react-redux"

import store from "./store"

import BasicSettings from "./components/BasicSettings"
import RequestSettings from "./components/RequestSettings"

render(
    <div>
        <RequestSettings />
        <br/><hr/><br/>
        <BasicSettings />
    </div>,
	document.getElementById('app')
);

/* var items = [ "item 1", "item 2" ]; 
render(
    React.DOM.ul( 
        { className: "ingredients" }, 
        items.map( ( ingredient, key) => 
            React.DOM.li( { key }, ingredient ) 
        ) 
    ),
	document.getElementById('app')
); */