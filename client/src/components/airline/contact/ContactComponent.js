
import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addContact } from '../../../actions/contact';
import { getContacts } from '../../../actions/contact';
import store from '../../../store';
import { REMOVE_ALERT } from '../../../actions/types';
import Alert from '../../../components/layout/Alert';
import ContactItem from './ContactItem';

const Contact = ({ getContacts, addContact, history, loading, contacts }) => {
    const [open, setOpen] = useState(false);

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

    useEffect(() => {
        store.dispatch({
            type: REMOVE_ALERT
        })
    });

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
                <button
                    type="button"
                    class="btn btn-info"
                    onClick={e => { getContacts(); setOpen(!open) }}>
                    {!open && (<div>Show All Messages</div>)}
                    {open && (<div>Hide Messages</div>)}
                </button>
                <div className="my-1">
                    {!loading && open && contacts && contacts.length > 0 && (
                        <div className="flightsContainer bg-white pp-1">
                            <Fragment>
                                {contacts.map(contact => (
                                    <div className="row">
                                        <div className="col-12">
                                            <ContactItem key={contact._id} contact={contact} />
                                        </div>
                                    </div>
                                )
                                )}
                            </Fragment>
                        </div>
                    )}
                </div>
                <Alert />
            </div>
        </Fragment >
    );
};

Contact.propTypes = {
    addContact: PropTypes.func.isRequired,
    getContacts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contacts: state.contact.contacts,
    loading: state.contact.loading
});

export default connect(mapStateToProps, { getContacts, addContact })(withRouter(Contact));