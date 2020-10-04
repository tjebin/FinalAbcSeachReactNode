import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Main from './MainComponent';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fa fa-dashboard' />
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fa fa-sign-out' />
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
            <li>
                <i className='fa fa-user' />
                <span className='hide-sm'>{user && user.name} </span>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Developers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <div>
            <Main />
        </div>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Navbar);