 var React = require('react')
 var api = require('../utils/api')
 var queryString = require('query-string')
 var PlayerPreview = require('./playerPreview')

function Profile(props) {
	var info = props.info.player;
	console.log(info)
	return (
	  	<PlayerPreview username={info.login} image={info.avatar_url}>
      		<ul className='space-list-items'>
        		{info.name && <li>{info.name}</li>}
        		{info.location && <li>{info.location}</li>}
        		{info.company && <li>{info.company}</li>}
        		<li>Followers: {info.followers}</li>
        		<li>Following: {info.following}</li>
       	 		<li>Public Repos: {info.public_repos}</li>
       	 		{info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      		</ul>
   	 	</PlayerPreview>
  	)
}

function Player(props) {
	console.log(props)
	return(
		<div className='row'>
			<h1 className='header'>{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
			<Profile info={props.info}/>
		</div>
	)
}

 class Results extends React.Component{ 
 	constructor(props){
 		super(props)

 		this.state = {
 			winner: null,
 			loser: null,
 			error: null,
 			loading: true
 		}
 	}

 	componentDidMount() {
 		var players = queryString.parse(this.props.location.search)
 		api.battle([
			players.playerOneName,
			players.playerTwoName
 		]).then(function(response) {
 			if(response === null) {
 				this.setState(function() {
 					return {
 						error: 'It seems like there is a problem. Please make sure both players exist on Github',
 						loading: false
 					}
 				})
 			}
			
			this.setState(function(){
				return {
					winner: response[0],
					loser: response[1],
					error: null,
					loading: false
				}
			})

 		}.bind(this))
 	}

 	render(){		

		const {winner, loser, error, loading} = this.state

		if(loading) {
			return(
				<p>Loading</p>
			)
		}

		if(error) {
			return(
				<p>{error}</p>
			)
		}

 		return(
			<div >
				<Player info={winner} label='Winner' score={winner.score}/>
				<Player info={loser} label='Loser' score={loser.score}/>
			</div>
 		)
 	}
 }

 module.exports = Results