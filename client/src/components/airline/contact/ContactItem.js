import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeContact } from '../../../actions/contact';

import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText,
} from "reactstrap";
//import { removeFlight } from '../../actions/flight'

const ContactItem = ({ removeContact, contact: {
    _id,
    firstName,
    lastName,
    message
} }) => {
    return (
        <>
            <Card>
                <CardBody>
                    <CardTitle>{firstName} {lastName}</CardTitle>
                    <CardText>
                        {message}
                    </CardText>
                    <Button
                        color="danger"
                        href="#pablo"
                        onClick={(e) => removeContact(_id)}>
                        Delete
                    </Button>
                </CardBody>
            </Card>
        </>
    )
}

ContactItem.propTypes = {
    removeContact: PropTypes.func.isRequired
};

export default connect(null, { removeContact })(withRouter(ContactItem));