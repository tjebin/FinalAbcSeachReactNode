import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardBody,
    CardTitle } from 'reactstrap';

import Home from './HomeComponent';
import Deals from './DealsComponent';
import DealsDetails from './DealsDetailsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Flights from './FlightsComponent';
import Contact from './ContactComponent';
import Hotels from './HotelsComponent';
import ToDoList from './ToDoListComponent';

import { DEALS } from '../shared/deals';
import { Switch, Route } from 'react-router-dom';

import '../App.css';

// implementation of components with hard coded object array; no props is passed
function RenderMenuItem ({deal}) {
    if(deal != null){
        return (
            <Card>
                <CardImg width="100%" src={deal.image} alt={deal.name} />
                <CardImgOverlay>
                    <CardTitle>{deal.name}</CardTitle>
                </CardImgOverlay>
                <CardBody>
                    {deal.description}
                </CardBody>
            </Card>
        );
    } else {
        return (
            <div></div>
        );
    } 
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: DEALS ,
            selectedDeal : null
        };
    }

    onDealSelect(deal) {
        this.setState({ selectedDeal: deal});
    }
    render() {
        let renderMenuItem;
        if (this.state.selectedDeal) {
            renderMenuItem = <RenderMenuItem deal={this.state.selectedDeal} />;
        } 
        
        const DealWithId = ({match}) => {
            return(
                <DealsDetails selectedDeal={this.state.deals.filter((deal) => deal.id === parseInt(match.params.dealId,10))[0]} />
            );
        };
        return (
        <div className="mainContainer">
            <Header/>
                <Switch>
                    <Route exact path='/'   component={() => <Home />}  />
                    <Route path='/home'     component={() => <Home />}  />
                    <Route path='/flights'  component={() => <Flights/>} />
                    <Route path='/contact'  component={() => <Contact/>}  />
                    <Deals path='/deals'    deals={this.state.deals}  onClick={(deal) => this.onDealSelect(deal)} />  
                    <Route path='/dealsDetails/:dealId' component={DealWithId} />
                    <Route path='/hotels' component={() => <Hotels />} />
                    <Route path='/toDoAdd' component={() => <ToDoList />} />
                </Switch>
            <Footer/>
                           
        </div>
        );
    }
}

export default Main;