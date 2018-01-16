 var React = require('react')
 var api = require('../utils/api')

 class Results extends React.Component{ 	

 	componentDidMount(){
 		var players = ['lcurvelo27', 'tyler']
		api.battle(players)
			.then(response => {
				console.log(response)
			})
 	}

 	render(){
 		console.log(this.props)
 		return(
			<div>
				Results
			</div>
 		)
 	}
 }

 module.exports = Results