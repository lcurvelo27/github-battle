var React = require('react');
var Popular = require('./popular')
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./nav')
var Home = require('./home')
var Battle = require('./battle')
var Results = require('./results')


class App extends React.Component {
	render() {
		return (
			<Router>
				<div className='container'>
				<Nav />
					<Switch>
						<Route path='/' component={Home} exact />
						<Route path='/battle' component={Battle} exact />
						<Route path='/battle/results' component={Results} />
						<Route path='/popular' component={Popular} />
						<Route render={function(){
							return <p>Not Found</p>
						}}/>
					</Switch>
				</div>
			</Router>
		)
	}
}

module.exports = App