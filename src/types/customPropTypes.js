import PropTypes from 'prop-types';

export const ReactComponentChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.string,
  PropTypes.number,
  PropTypes.node,
  PropTypes.element
]);

export const ImageSetPropType = PropTypes.shape({
  landscape_big: PropTypes.shape({
    url: PropTypes.string
  }),
  landscape_small: PropTypes.shape({
    url: PropTypes.string
  }),
  thumb: PropTypes.shape({
    url: PropTypes.string
  }),
  url: PropTypes.string
});
