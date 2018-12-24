import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ stars }) => (
  <div>
    {`${Math.floor(stars)} stars`}
  </div>
);

Rating.defaultProps = {
  stars: null,
};

Rating.propTypes = {
  stars: PropTypes.number,
};

export default Rating;
