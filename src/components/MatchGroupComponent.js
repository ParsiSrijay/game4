import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import MatchQuestion from './MatchComponent';
import Carousel from 'react-elastic-carousel';
import desktopImage from '../assets/images/matchbg.png';
import Score from './ScoreComponent';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

var count = 0;
var a = 0;
var len = 0;
function CheckAnswer({correctAnswer,selectedOptions,display,score}){
  var c=0;
  if(a===len && display){
    for(var i=0;i<correctAnswer.length;i++){
      if(correctAnswer[i].value === selectedOptions[i].value){
        c = c + 1;
      }
    }
    count = score + c;
    return(
      // <Alert key={1} variant='success'>
      //   <span>Your points :&nbsp;</span>{c}
      // </Alert> 
      <div className="mb-2">
        <div>

            <span className="fa  fa-star fa-lg"></span> Your Score is {c}

            <Score score={count} />

        </div>
      </div>
    );
  }
  else if(display){
        for(var i=0;i<correctAnswer.length;i++){
      if(correctAnswer[i].value === selectedOptions[i].value){
        c = c + 1;
      }
    }
    count = score + c;
    return(
      // <Alert key={1} variant='success'>
      //   <span>Your points :&nbsp;</span>{c}
      // </Alert> 
      <div className="mb-2">
        <div>
            <span className="fa  fa-star fa-lg"></span> Your Score is {c}
        </div>
      </div>
    );
  } 
  else{
    return(
      <div>
      </div>
    );
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class RenderGame extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.matches,
            info: this.props.matches,
            dragDisabled:false,
            showScore:false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleScore = this.handleScore.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items:items
    });
  }

  handleDrag(){
    this.setState({
      dragDisabled: true,
      showScore:true
    });
    a = this.props.responses + 1;
  }

  handleScore(){
    this.setState({
      showScore: false,
      dragDisabled:false
    });
  }

  componentDidMount() {
    var columns = this.state.info;
    for(var i = columns.length - 1 ; i > 0; i--){
            const j = Math.floor(Math.random() * i);
            const temp = columns[i];
            columns[i] = columns[j];
            columns[j] = temp;
    }
    this.setState({
      info : columns
    })
  }

  render() {
  

    const inf = this.props.matches.map((info) => {

        return (
            <div key={info.id}>
                <a role="button" className="btn btn-success dropbox pt-1">{info.key}</a>
            </div>
        );
    });

    return (
      <>
      
        <div className="container">
            <div className="row">
                <div className="col-12 mt-4">
                    
                </div>
                <div className="col-12 mt-4 mb-4">
                    <b><i>Start Matching now</i></b>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    {inf}
                </div>
                <div className="col-4">
                <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                    <>  
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                            >
                        {this.state.items.map((item, index) => ( 
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index} isDragDisabled={this.state.dragDisabled}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="col-12"
                                >
                                    <a role="button" className="btn btn-primary dropbox pt-1">{item.value}</a>
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    </>
                    )}
                </Droppable>
                </DragDropContext>
                </div>
            </div>
        </div>
        {' '}
        <div className="container">
            <div className="row">
                <div className="mt-2 offset-3 offset-md-2" style={{display: this.state.dragDisabled ? 'none' : 'inline-block' }}>
                    <Button onClick={this.handleDrag} className="bg-info dropbox pt-1">
                        <span>Score</span>
                    </Button>
                </div>
                <div className="mt-2 offset-2" style={{display: this.state.dragDisabled ? 'inline-block' : 'none' }}>
                    <Button onClick={this.handleScore} className="bg-warning dropbox pt-1">
                        <span>Play Again</span>
                    </Button>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <CheckAnswer correctAnswer={this.props.matches} selectedOptions={this.state.items} display={this.state.dragDisabled} score={this.props.score} />
        </div>
      
      </>
    );
  }
}

class MatchGroup extends Component {

    constructor(props) {
        super(props);
        this.state={
            score:0,
            responses:0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleScore = this.handleScore.bind(this);
        this.handle =this.handle.bind(this);
    }

    componentDidMount(){
        count = this.state.score;
        a=this.state.responses;
    }

    handleClick(questions) {
        return(
        <RenderGame matches={questions} />
        );
    }

    handleScore(){
        this.setState({
            score:count
        });
    }

    handleResponse(){
        this.setState({
            responses:a
        });
    }

    handle(){
        this.handleScore();
        this.handleResponse();
    }

    render() {
        len = this.props.matchgroups.length;
        const mgs = this.props.matchgroups.map((mg) => {
            return(
            <div className="col-12 col-md-8 offset-md-3">
               <RenderGame matches={mg.elements}  score={this.state.score} responses={this.state.responses}/> 
            </div>
            );
        })

        return (
        <div className="App1" style={{backgroundImage: `url(${desktopImage})` }}>
            <div className="container">
                <div className="row">
                    <Carousel onNextStart={this.handle} onPrevStart={this.handleResponse}>
                        {mgs}
                    </Carousel>
                </div>
            </div>
        </div>
        );
    }
}

export default MatchGroup;