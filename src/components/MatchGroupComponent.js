import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import MatchQuestion from './MatchComponent';
import RenderGame from './RenderGame';
import Carousel from 'react-elastic-carousel';

class MatchGroup extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(questions) {
        return(
        <RenderGame matches={questions} />
        );
    }

    render() {

        const mgs = this.props.matchgroups.map((mg) => {
            return(
               <RenderGame matches={mg.elements} /> 
            );
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                    <Carousel>
                        {mgs}
                    </Carousel>
                    </div>
                </div>
            </div>
        );
    }
}

export default MatchGroup;