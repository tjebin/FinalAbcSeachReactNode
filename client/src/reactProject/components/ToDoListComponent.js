import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,
            Button, Form, FormGroup, Label, Input, Col,FormFeedback, Card, CardTitle,Checkbox } from 'reactstrap';
import FlipMove from "react-flip-move";
import { connect } from 'react-redux';
import { makeCompleted } from '../redux/actionCreators';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterItems = this.filterItems.bind(this);


    }

    handleSubmit(event) {
        if (this._inputElement.value !== "") {
            this.props.addToDo( this._inputElement.value, Date.now(),false);
            this._inputElement.value = "";
        }     
         event.preventDefault();
    }

    delete(id) {
        this.props.deleteToDo(id);
    }

    makeCompleted(id) {
        this.props.makeCompleted(id);
    }

    filterItems( filter){
        alert(filter);
        this.props.filterToDos(filter);
    }


    render() {
        const listToDos = this.props.listToDos.map((item) => {
            return (
                <div className="row rowExtension" key={item.id}>
                    { item.isCompleted == true &&
                        <div className="col-4  strike-through" onClick={() => this.makeCompleted(item.id)}>
                            {item.name}
                        </div>
                    }
                    { item.isCompleted == false  &&
                        <div className=" col-4 " onClick={() => this.makeCompleted(item.id)}>
                            {item.name}
                        </div>
                    }
                    <div className="col-4 my-auto ">
                        <Button color="secondary" size="sm" onClick={() => this.delete(item.id)}>X</Button>
                    </div>
                </div>
            );
        });
        return (
            <div className="container paddingBottom">
                <div className="row">
                    <div className="col-8">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>To Do List</BreadcrumbItem>
                        </Breadcrumb>
                    </div>             
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="toDo">To Dos</Label>
                                </Col>
                                <Col md={6}>
                                    <input ref={(a) => this._inputElement = a} 
                                        placeholder="enter task" onChange={this.handleChange}>
                                    </input>
                                </Col>
                                <Col md={3}>
                                    <Button type="submit" size="sm" color="primary">
                                        Add To Do
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div class="row">
                    <div className="col-sm-8">
                        <FlipMove duration={250} easing="ease-out">
                            {listToDos}
                        </FlipMove> 
                    </div>
               </div>
                { listToDos.length > 0 &&
                    <div className="row" >
                        <div className="col-md-6 ml-3">
                            Filter
                            <a className="filterStyle" onClick={() => this.filterItems("all")}>All </a>                      
                            <a className="filterStyle" onClick={() => this.filterItems("Completed")} >Completed </a>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispach => {
    return {
      addToDo:(name,date,completed)=> dispach({ type: "ADD_TODO",  name, date, completed }),
      makeCompleted:id=>dispach({ type: "MAKE_COMPLETED", id}),
      deleteToDo:id => dispach({type:"MAKE_DELETED", id}),
      filterToDos:filter => dispach({type:"FILTER_ITEMS", filter})
    };
  };
  
  const mapStateToProps = state => {
    return {
      listToDos: state.rA.listToDos
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);