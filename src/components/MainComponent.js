import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchQuestions } from '../redux/ActionCreators';
import Questions from './QuestionsComponent';
import MatchGroup from './MatchGroupComponent';
import Final from './Final';
import Home from './HomeComponent';
import FinalScore from './FinalScoreComponent';
import { questions } from '../shared/db';
import { Button } from 'react-bootstrap';
import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import "../index.css";
import soundfile from '../assets/sound.mp3';
import Sound from 'react-sound';

class Main extends Component{
	constructor(props){
    super(props);
  }
  


	render(){

		
		var mq=[];
		var sq=[];
		console.log("Component mounted");
		questions.MCQ.forEach((mcq) => {
			const newq = {
				"question" : mcq.value.question,
				"options" : [
					{
						"id" : "1",
						"content" : mcq.value.option1
					},
					{
						"id" : "2",
						"content" : mcq.value.option2
					},
					{
						"id" : "3",
						"content" : mcq.value.option3
					},
					{
						"id" : "4",
						"content" : mcq.value.option4
					}
				],
				"answer" : mcq.value.answer
			}
			mq.push(newq);
		});
		questions.SCEN.forEach((sc) => {
			const nq = {
				"question" : sc.value.scenario,
				"options" : [
					{
						"id" : "1",
						"options" : sc.value.stmt1
					},
					{
						"id" : "2",
						"options" : sc.value.stmt2
					},
					{
						"id" : "3",
						"options" : sc.value.stmt3
					}
				],
				"correctAnswer" : [
					{
						"id" : "1",
						"options" : sc.value.cstmt1
					},
					{
						"id" : "2",
						"options" : sc.value.cstmt2
					},
					{
						"id" : "3",
						"options" : sc.value.cstmt3
					}
				]
			}
			sq.push(nq);
		});

		const Question = () =>{
	  		return(
	  			<Questions questions={sq} />
	  		);
	  	}

	  	const Match = () => {
	  		return(
	  			<MatchGroup matchgroups={questions.MATCH} />	
	  		);
	  	}

	  	const Mcq = () => {
	  		return(
	  			<div className="col-12">
	  				<Final quizQuestions={mq} />
	  			</div>
	  		);
	  	}
	  	

		return(
			<>
			<Sound url={soundfile} playStatus={Sound.status.PLAYING} />
			<Switch>
			  <Route exact path="/home" component={() => <Home />} />	
              <Route exact path="/game1" component={ Question  } />
              <Route exact path="/game2" component={ Match  } />
              <Route exact path="/game3" component={ Mcq } /> 
			  <Redirect to="/home" /> 
            </Switch>
            </>	
		)
	}
}
export default withRouter(Main);