import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education: {
    school,
    degree,
    fieldofstudy,
    to,
    from,
    description
} }) => <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <strong>Field Of Study </strong> {fieldofstudy}
        </p>
        <p>
            <Moment date={from} format="YYYY/MM/DD" />- {!to ? 'Now' : <Moment date={to} format="YYYY/MM/DD" />}
        </p>
        <p>
            <strong>Degree</strong> {degree}
        </p>
        <p>
            <strong>Description</strong> {description}
        </p>
    </div>

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired
};

export default ProfileEducation;