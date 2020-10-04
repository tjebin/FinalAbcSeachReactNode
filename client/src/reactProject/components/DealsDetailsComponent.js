import React, { Component } from 'react';

import { Card, CardImg, CardText,
    CardTitle ,BreadcrumbItem , Breadcrumb} from 'reactstrap';
import { Link } from 'react-router-dom';
// 

class DealsDetails extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let imageName ="../"+this.props.selectedDeal.image;
        return (
            <div className="container">
                 <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/deals">Deals</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.selectedDeal.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>             
                </div>
                <div>
                <Card  className="border-0">
                    <div className="row no-gutters mb-5" > 
                        <div className="col-md-4">
                            <CardImg 
                                width="100%"
                                height="100%"
                                src={imageName}
                                alt="Card image cap" />
                        </div>
                        <div className="col-md-4">
                            <Card body inverse color="info">
                                <CardTitle >{this.props.selectedDeal.category}</CardTitle>
                                <CardText>
                                    <p>{this.props.selectedDeal.name}</p>
                                    <p>{this.props.selectedDeal.description}</p>
                                    <p>{this.props.selectedDeal.deals}</p>
                                </CardText>
                            </Card>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
        );
    }
}
export default DealsDetails;