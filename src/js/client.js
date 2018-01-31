import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, hashHistory } from "react-router"
import { Provider } from "react-redux"

import store from "./store"

import Authenticate from "./components/Authentication/Authentication"
import MasterLayout from "./components/MasterLayout"
import MasterTableLayout from "./components/MasterTableLayout"
import ItemDetails from "./components/ItemDetails"
import Settings from "./components/Settings"

ReactDOM.render(
	<Provider store={store}>
		<Router history={ hashHistory }>
			<Route path="/" component={ MasterTableLayout } >
				{/* <Route path="table" component={ Authenticate(MasterTableLayout) } /> */}
                {/* <Route path="/table" component={ MasterTableLayout } /> */}
			</Route>
		</Router>
	</Provider>,
	document.getElementById('app')
);

// <IndexRoute component={ MasterTableLayout } />
// <Route key="settings" path="settings" component={ Settings } />
