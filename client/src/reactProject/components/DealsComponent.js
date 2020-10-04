import React, { Component } from 'react';
import { Card, CardImg, CardText, 
    CardTitle,BreadcrumbItem , Breadcrumb} from 'reactstrap';
    import { Link } from 'react-router-dom';

// implementation of components with passed props

class Deals extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const deal = this.props.deals.map((deal) => {
            return (
              <div  className="col-12 col-md-4 m-1">
                <Link to={`/dealsDetails/${deal.id}`} >
                    <Card key={deal.id} onClick={() => this.props.onClick(deal)}   > 
                        <CardImg width="100%"  className="card-img-top" src={deal.image} alt={deal.name} />
                        <CardTitle>{deal.category}</CardTitle>
                    </Card>
                </Link>
              </div>
            );
        });
        return (
            <div className="container">
                 <div className="row">
                    <div className="col-12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Deals</BreadcrumbItem>
                        </Breadcrumb>
                    </div>             
                </div>
                <div className="row">
                    {deal}
                </div>
            </div>
        );
    }
}
export default Deals;