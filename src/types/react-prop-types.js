import PropTypes from 'prop-types';

export const themePropType = {
  colors: PropTypes.shape(),
  typo: PropTypes.shape(),
};

export const fieldPropType = PropTypes.shape({
  error: PropTypes.string,
  focused: PropTypes.bool,
  label: PropTypes.string,
  theme: themePropType,
});

export const doctorsStorePropType = PropTypes.object;

export const doctorStorePropType = PropTypes.object;

export const specializationStorePropType = PropTypes.object;

export const DoctorStorePropType = PropTypes.object;

export const avatarPropType = PropTypes.shape({
  id: PropTypes.string,
  src: PropTypes.string,
});

export const experiencePropType = PropTypes.shape({
  description: PropTypes.string,
  worplaces: PropTypes.array,
});

export const schedulePropType = PropTypes.shape({
  id: PropTypes.string,
  work_days: PropTypes.array,
});

export const specializationPropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
});
