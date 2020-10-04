import React, { Component } from 'react';
import { Media } from 'reactstrap';
import '../App.css';

import { Navbar, NavbarBrand, BreadcrumbItem , Breadcrumb} from 'reactstrap';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // places array of objects
            places: [
                {
                  id: 0,
                  name:'Bahamas',
                  image: 'assets/images/bahamas.jpg',
                  category: 'mains',
                  label:'Hot',
                  price:'4.99',
                  description:'The Bahamas known officially as the Commonwealth of The Bahamas,is a country within the Lucayan Archipelago in the West Indies.'
                },
                {
                    id: 1,
                    name:'Florida',
                    image: 'assets/images/florida.jpg',
                    category: 'mains',
                    label:'Hot',
                    price:'4.99',
                    description:'Florida  is the southernmost contiguous state in the United States. The state is bordered to the west by the Gulf of Mexico, to the northwest by Alabama, to the north by Georgia, to the east by the Atlantic Ocean, and to the south by the Straits of Florida'
                },
                {
                    id: 2,
                    name:'Hawai',
                    image: 'assets/images/hawai.jpg',
                    category: 'mains',
                    label:'Hot',
                    price:'4.99',
                    description:' Hawai is a state of the United States of America. It is the only state located in the Pacific Ocean and the only state composed entirely of islands.'
                },
                {
                    id: 1,
                    name:'California',
                    image: 'assets/images/california.jpg',
                    category: 'mains',
                    label:'Hot',
                    price:'4.99',
                    description:'California is a state in the Pacific Region of the United States. With 39.5 million residents across a total area of about 163,696 square miles (423,970 km2), California is the most populous U.S. state and the third-largest by area'
                }
            ],
        };
    }
    render() {
        const places_image = {
            height: 200,
            width: 300
        }
        const home = this.state.places.map((place) => {
            return (
              <div key={place.id} className="col-12 mt-2 ">
                <Media  tag="li">
                  <Media left middle className="mr-3">
                      <Media object src={place.image} alt={place.name} style={places_image}/>
                  </Media>
                  <Media body >
                    <Media heading>{place.name}</Media>
                    <p>{place.description}</p>
                  </Media>
                </Media>
              </div>
            );
        });
        return (
          <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem active>Home</BreadcrumbItem>
                        </Breadcrumb>
                    </div>             
                </div>
                <div className="row">
                    <div className="col-12 ml-5 mb-4">
                        <h4>The Top Destinations</h4>
                        Wondering where to go this year? This is your place to start.
                    </div>
                </div>
                <div className="row">
                    <Media list>
                        {home}
                    </Media>
                </div>
          </div>
        );
    }
}

export default Home;