import React, { Component } from 'react'
import Button from '../Button/Button';
import "./Styles.css";

 class ListItem extends Component {
     constructor(props){
         super(props)
     }
    render() {
        return (
            <div className="list-item">
                <span className="task-title">
                    {this.props.task}
                </span>

                <Button
            text="Delete"
            isPurble={true}
            handleClick={this.props.handleDelete}
            />

            </div>
            
        )
    }
}
export default ListItem;