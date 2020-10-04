
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addContact } from '../../../actions/contact';
import store from '../../../store';
import { REMOVE_ALERT } from '../../../actions/types';
import Alert from '../../../components/layout/Alert';

const Contact = ({ addContact, history }) => {
    useEffect(() => {
        store.dispatch({
            type: REMOVE_ALERT
        })
    });

    var [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        telNum: '',
        email: '',
        agree: false,
        message: ''
    });
    const {
        firstName,
        lastName,
        telNum,
        email,
        agree,
        message
    } = formData;
    const onChange = (e) => {
        if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    }

    return (
        <Fragment>
            <div className="container">
                <h1 className="large text-primary">
                    Add Contact
                </h1>
                <small>* = required field</small>
                <form className="form" onSubmit={e => {
                    e.preventDefault();
                    addContact(formData, history);
                }}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            required
                            value={firstName}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            placeholder="Tel Number"
                            name="telNum"
                            value={telNum}
                            required
                            onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <input type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)} />
                    </div>
                    <div className="form-group">
                        <p>
                            <input
                                type="checkbox"
                                name="agree"
                                checked={agree}
                                onChange={e => onChange(e)} />
                            &nbsp; Should we contact you?
                        </p>
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            cols="30"
                            rows="5"
                            placeholder="Message....."
                            value={message}
                            onChange={e => onChange(e)}>
                        </textarea>
                    </div>
                    <input type="submit" className="btn btn-primary my-1" />
                </form>
                <Alert />
            </div>

        </Fragment >
    );
};

Contact.propTypes = {
    addContact: PropTypes.func.isRequired
};

export default connect(null, { addContact })(withRouter(Contact));
