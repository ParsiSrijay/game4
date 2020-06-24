import React,{ Component } from 'react';
import { Button,Modal,ModalHeader,ModalBody } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class FinalScore extends Component{
	constructor(props){
		super(props);
		this.handlePlayAgain = this.handlePlayAgain.bind(this);
		this.handleHome = this.handleHome.bind(this);
	}

	handlePlayAgain(){
		this.props.history.push("/game1");
	}

	handleHome(){
		this.props.history.push("/home");
	}

	render(){
		return(
			<Modal isOpen={true}>
				<ModalHeader>Game Ended!!</ModalHeader>
				<ModalBody>
					Your Score : {this.props.score}
					<div className="row">
						<div className="col-4">
							<Button onClick={this.handlePlayAgain}> Play Again </Button>
						</div>
						<div className="col-3">
						</div>
						<div className="col-5">
							<Button onClick={this.handleHome}> Play Another Game </Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}

export default withRouter(FinalScore);