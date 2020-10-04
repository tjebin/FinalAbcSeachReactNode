import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autocomplete from "./AutoComplete";
import  {SUGGESTIONS}  from '../shared/suggestions';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Breadcrumb, BreadcrumbItem,
            Button, Form, FormGroup, Label, Input, Col,FormFeedback ,Card} from 'reactstrap';

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: '',
            departureDate:'',
            arrivalDate:'',
            touched: {
                from: false,
                to: false,
                departureDate : false,
                arrivalDate:false
            },
            suggestions: SUGGESTIONS,
            filteredPlaces:[],
            userInput: '',
            showOptions: false
        };
      
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDepartureDayChange = this.handleDepartureDayChange.bind(this);
        this.handleArrivalDayChange = this.handleArrivalDayChange.bind(this);
        this.chooseOption = this.chooseOption.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    
        const userInput = event.currentTarget.value;
        const suggestions  = this.state.suggestions;
        
        function filter( suggestions ) { 
            var result = [];
            for( var i= 0, len = suggestions.length; i < len; i++) {
                var el = suggestions[i];
                if( el.Name.toLowerCase().indexOf(userInput) > -1){
                    result.push( el );
                }
            }
            return result;
        }
        
        const filteredPlacesModified = filter(suggestions);
        this.setState({
            ...this.state,
            from: userInput,
            filteredPlaces: filteredPlacesModified,
            showOptions: true
        });
    }

    handleDepartureDayChange(selectedDay) {
        this.state = {departureDate: selectedDay};
    }
    
    handleArrivalDayChange(selectedDay) {
        this.state = {arrivalDate: selectedDay};
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
       this.setState({ state: this.state });
    }

    validate(from, to,departureDate, arrivalDate) {
        const errors = {
            from: '',
            to: '',
            departureDate : '',
            arrivalDate:''
        };

        if (this.state.touched.from && from.length < 3)
            errors.from = 'From should be >= 3 characters';
        else if (this.state.touched.from && from.length > 10)
            errors.firstname = 'First Name should be <= 10 characters';

        if (this.state.touched.to && to.length < 3)
            errors.to = 'To should be >= 3 characters';
        else if (this.state.touched.to && to.length > 10)
            errors.to = 'To should be <= 10 characters';
        return errors;
    }
    
    handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

    chooseOption(data){
        console.log("onClick executed");
       // this.state = {from: data.Name};
    }
    
    render() {
        const errors = this.validate(this.state.from, this.state.to,  this.state.departureDate,  this.state.arrivalDay);
       console.log(" renders............");
       
        const flteredFromPlaces = this.state.filteredPlaces.map((data)=>{
            return(
                <div key={data.Id} onClick={this.chooseOption(data)}> {data.Name}</div> 
            )
           }
         )
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Flights</BreadcrumbItem>
                        </Breadcrumb>
                    </div>    
                </div>
                <div className="row">
                   <div className="col-12">
                        <h5>Search Flights</h5>
                   </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="card card-body ">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup row >
                                            <Col md={3} >
                                                <div class="input-icons"> 
                                                    <div className="sideIcon">
                                                        <i className="fa fa-plane"></i>
                                                    </div>
                                                    <Input type="text" id="from" name="from" autocomplete="off" style={{ paddingLeft: '20px'}}
                                                        placeholder="Boston (BOS)"
                                                        value={this.state.from}
                                                        valid={errors.from === ''}
                                                        invalid={errors.from !== ''}
                                                        onBlur={this.handleBlur('from')}
                                                        onChange={this.handleInputChange} />
                                                        {this.state.showOptions && flteredFromPlaces.length > 0 && 
                                                            <div style={{width:'40%',padding: '12px',border: '1px solid pink',fontSize:'12px',
                                                                borderRadius: '3px'}}>
                                                                {flteredFromPlaces}
                                                            </div>
                                                        }
                                                        <FormFeedback>{errors.from}</FormFeedback>
                                                </div>
                                            </Col>
                                            
                                        
                                            <Col md={3}>
                                                <div class="input-icons"> 
                                                    <div className="sideIcon">
                                                        <i className="fa fa-plane"></i>
                                                    </div>
                                                    <Input type="text" id="to" name="to" style={{ paddingLeft: '20px'}}
                                                        placeholder="Worcestor"
                                                        value={this.state.to}
                                                        valid={errors.to === ''}
                                                        invalid={errors.to !== ''}
                                                        onBlur={this.handleBlur('to')}
                                                        onChange={this.handleInputChange} />
                                                        <FormFeedback>{errors.to}</FormFeedback>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div class="input-icons">
                                                    <diV className="sideIcon" >
                                                       <i className="fa fa-calendar"></i>
                                                    </diV>
                                                    <DayPickerInput
                                                        onDayChange={this.handleDepartureDayChange}
                                                        selectedDay={this.state.departureDate}
                                                        format="DD/MM/YY"
                                                        inputProps={{ style: { width: '170px',height:'38px',border: '1px solid green', 
                                                        paddingLeft : '20px',
                                                        borderRadius: '3px'} }}
                                                        dayPickerProps={{
                                                            month: new Date(),
                                                            showWeekNumbers: true,
                                                            todayButton: 'Today'
                                                        }}
                                                    />  
                                                </div> 
                                            </Col>
                                            <Col md={3}>
                                                <div class="input-icons">
                                                    <diV className="sideIcon" >
                                                       <i className="fa fa-calendar"></i>
                                                    </diV>
                                                    <DayPickerInput
                                                        onDayChange={this.handleArrivalDayChange}
                                                        selectedDay={this.state.arrivalDate}
                                                        format="DD/MM/YY"
                                                        inputProps={{ style: { width: '170px',height:'38px',border: '1px solid green', 
                                                        paddingLeft : '20px',
                                                        borderRadius: '3px'} }}
                                                        dayPickerProps={{
                                                            month: new Date(),
                                                            showWeekNumbers: true,
                                                            todayButton: 'Today'
                                                        }}
                                                    />   
                                                </div> 
                                            </Col>
                                            <Col md={3}>
                                                <div class="input-icons"> 
                                                    <diV className="sideIcon" >
                                                       <i className="fa fa-search"></i>
                                                    </diV>
                                                    <Button  type="submit"  color="secondary" style={{ paddingLeft: '20px' }}>
                                                        Search
                                                    </Button>
                                                </div>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        );
    }
}
export default Flights;