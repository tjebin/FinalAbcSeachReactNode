import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem,
    Card, CardImg, CardText, 
    CardTitle } from 'reactstrap';
import { connect } from 'react-redux';
import '../App.css';


class Hotels extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.state = { visible: true }
      }
    
      handleClick() {
        this.setState(prev => ({ visible: !prev.visible }))
      }
      
      render() {
        const AllHotels = ({  availableHotels }) => ( 
            availableHotels.map((eachHotel) => {
                return (
                  <div  className='elementToFadeInAndOut'>{eachHotel.name}</div>
                );
            })
        )
        
        const hotels = this.props.hotels.map((hotel) => {
            return (
              <div  className="col-12 col-md-6 ">
                    <Card key={hotel.id}> 
                        <CardTitle>{hotel.name}</CardTitle>
                        <AllHotels  availableHotels={hotel.hotelsAvailable} />
                    </Card>
              </div>
            );
        });
        return (
            <div className="container marginBottom">
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Hotels</BreadcrumbItem>
                        </Breadcrumb>
                    </div>             
                </div>
                <div className="row ">
                    {hotels}
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
      hotels: state.rA.hotels
    };
  };

export default (connect(mapStateToProps)(Hotels));