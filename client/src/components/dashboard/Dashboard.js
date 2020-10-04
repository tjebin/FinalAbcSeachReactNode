import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { logout } from '../../actions/auth';

const Dashboard = ({
    getCurrentProfile,
    profile: { profile, loading },
    deleteAccount,
    logout,
    auth: { user }
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> :
        <div className="container">
            <h1 className="large text-primary">Dasboard</h1>
            <div className="dashboard_Nav">
                <ul>
                    <li>
                        <Link to="/posts" style={{ textDecoration: 'none', color: 'white' }}>Posts</Link>
                    </li>
                    <li>
                        <Link to="/logout" style={{ textDecoration: 'none', color: 'white' }} onClick={() => logout()}>Logout</Link>
                    </li>
                </ul>
            </div>
            <p className="lead">
                <i className="fa fa-user">
                    Welcome {user && user.name}
                </i>
            </p>
            {profile !== null ? <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()}>
                        <i className="fa fa-user-minus">
                            Delete My Account
                        </i>
                    </button>
                </div>
            </Fragment> :
                <Fragment>
                    <p> You have not setup a profile, please add some info </p>
                    <Link to="/createProfile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            }
        </div>;
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, logout })(Dashboard);
