import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { removeFlight } from '../../actions/flight'

const FlightItem = ({ removeFlight, flight: {
    _id,
    from,
    to,
    departureDate,
    arrivalDate,
    price,
    airlineName,
    route,
    deal
} }) => {
    return (
        <div className="container  flight-item">
            <div className="row font-weight-light ">
                <div className="col-4">
                    <Moment date={departureDate} format="YYYY/MM/DD" />- {<Moment date={arrivalDate} format="YYYY/MM/DD" />}
                </div>
                <div className="col-4">
                    {route}
                </div>
                <div className="col-3">
                    {from} {'->'} {to}
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    {airlineName}
                </div>
                <div className="col-4">
                    {price}
                </div>
                <div className="col-3">
                    {deal}
                </div>
                <div className="col-*">
                    <button className="btn btn-danger" onClick={(e) => removeFlight(_id)}>
                        <i className="fa fa-user-minus">
                            X
                        </i>
                    </button>
                </div>
            </div>
        </div>
    )
}

FlightItem.propTypes = {
    removeFlight: PropTypes.func.isRequired
};

export default connect(null, { removeFlight })(FlightItem);