import React, { Component } from 'react';
import Home from '../airline/HomeComponent';
import Deals from '../airline/DealsComponent';
import DealsDetails from '../airline/DealsDetailsComponent';
import Header from '../airline/HeaderComponent';
import Footer from '../airline/FooterComponent';
import Flights from '../airline/FlightsComponent';
import Contact from '../airline/contact/ContactComponent';
import Hotels from '../airline/HotelsComponent';
import FlightForm from '../airline/FlightForm';
import { HOTELS } from '../../shared/hotels';
import { DEALS } from '../../shared/deals';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profileForms/CreateProfile';
import EditProfile from '../profileForms/EditProfile';
import AddEducation from '../profileForms/AddEducation';
import AddExperience from '../profileForms/AddExperience';
import Posts from '../posts/Post';
import Post from '../post/Post';
import PrivateRoute from '../routing/PrivateRoute';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: DEALS,
            hotels: HOTELS,
            selectedDeal: null
        };
    }
    onDealSelect(deal) {
        this.setState({ selectedDeal: deal });
    }
    render() {
        const DealWithId = ({ match }) => {
            return (
                <DealsDetails selectedDeal={this.state.deals.filter((deal) => deal.id === parseInt(match.params.dealId, 10))[0]} />
            );
        };
        return (
            <div className="container">
                <Header />
                <Switch>
                    <Route exact path='/' component={() => <Home />} />
                    <Route path='/home' component={() => <Home />} />
                    <Route path='/flights' component={() => <Flights />} />
                    <Route path='/contact' component={() => <Contact />} />
                    <Deals path='/deals' deals={this.state.deals} onClick={(deal) => this.onDealSelect(deal)} />
                    <Route path='/dealsDetails/:dealId' component={DealWithId} />
                    <Route path='/hotels' component={() => <Hotels hotels={this.state.hotels} />} />
                    <Route path='/addFlight' component={() => <FlightForm />} />
                    <Route path='/login' component={() => <Login />} />
                    <Route path='/register' component={() => <Register />} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/createProfile" component={CreateProfile} />
                    <PrivateRoute exact path="/editProfile" component={EditProfile} />
                    <PrivateRoute exact path="/addExperience" component={AddExperience} />
                    <PrivateRoute exact path="/addEducation" component={AddEducation} />
                    <PrivateRoute exact path="/posts" component={Posts} />
                    <PrivateRoute exact path="/posts/:id" component={Post} />
                    <PrivateRoute path='/logout' component={() => <Login />} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;