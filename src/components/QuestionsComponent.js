import React,{ Component } from 'react';
import { Card,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
//import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Carousel from 'react-elastic-carousel';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Alert,Button } from 'react-bootstrap';
import FinalScore from './FinalScoreComponent';
import { Switch,Route,withRouter } from 'react-router-dom';
import desktopImage from '../assets/images/game4.jpg';
import '../App.css';

var count = 0;
var a=0;
var len=0;
var check = false;
function CheckAnswer({correctAnswer,selectedOptions,display,score,response}){
  var c=0;
  if(a===len && display){
    for(var i=0;i<correctAnswer.length;i++){
      if(correctAnswer[i].options === selectedOptions[i].options){
        c=c+1
      }
      else{
        count = count-1;
        return( 
          <>
          <FinalScore score={count} />
            <Alert key={1} variant='danger'>
              Wrong Answer !!! { a }
            </Alert>
          </>
        );
      }
    }
    
    console.log(count);
    return( 
      <>
        <FinalScore score={count} />
        <Alert key={1} variant='success'>
          Correct Answer !!!
        </Alert>
      </>   
    );
  }
  else if(display){
    for(var i=0;i<correctAnswer.length;i++){
      if(correctAnswer[i].options === selectedOptions[i].options){
        c=c+1
      }
      else{
        count = count - 1;
        return( 
          <>
          	<Alert key={1} variant='danger'>
            	Wrong Answer !!! { a }
          	</Alert>
          </>
        );
      }
    }
    console.log(count);
    return( 
      <>
      	<Alert key={1} variant='success'>
        	Correct Answer !!!
      	</Alert>
      </>   
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

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
});

class OptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.options,
      dragDisabled:false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
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
      dragDisabled:true
    });
    a = this.props.response + 1; 
    console.log("a is " +a);
    console.log("count is " +count);
  }

  
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <>  
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => ( 
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index} isDragDisabled={this.state.dragDisabled}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          className="col-12"
                        >
                          {item.options}
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
        {' '}
        
          <div className="mr-2 mt-2">
            <Button onClick={this.handleDrag}>
              <span>Submit</span>
            </Button>
            
          </div>
        <div className="mt-2">
          <CheckAnswer correctAnswer={this.props.correctAnswer} selectedOptions={this.state.items} display={this.state.dragDisabled} score={this.props.score} response={this.props.response}/>
        </div>
      </>
    );
  }
}


function RenderQuestions({question}){
	return(
		<Card>
			<center><CardTitle>{question.id}.  {question.category}</CardTitle></center>
			<CardBody>{question.question}</CardBody>
		</Card>
	);
}

class Questions extends Component{
  constructor(props){
    super(props);
    this.state={
      score:0,
      response:0
    }
    this.handleScore = this.handleScore.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.handle = this.handle.bind(this);
  }

  componentDidMount(){
    count=this.state.score;
    a=this.state.response;
  }

  handleScore(){
    this.setState({
      score:count
    });
  }

  handleResponse(){
      this.setState({
        response:a
      });
  }

  handle(){
    this.handleResponse();
    this.handleScore();
  }

  render(){
    len=this.props.questions.length;
    count = this.props.questions.length;
    const questions = this.props.questions.map((question)=>{
      return(
          <>
            <div key={question.id} className="col-12 m-1">
               <RenderQuestions question={question} />
               <div className="mt-2">
                <OptionDetails options={question.options} correctAnswer={question.correctAnswer} score={this.state.score} response={this.state.response}/>
               </div>
            </div>
          </> 
      );
    });
    return(
      <>
        <div className="App" style={{backgroundImage: `url(${desktopImage})` }}>
          <div className="row">
            <div className="col-12 mt-5 col-md-8">
              <h3 className="game1">Questions</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-8 ml-auto mr-auto">
              <Carousel onNextStart={this.handle} onPrevStart={this.handleResponse}> 
                {questions}
              </Carousel>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(Questions);



