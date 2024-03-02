import {createRef} from 'react';

export const navigationRef = createRef();

const navigate = (name, params) => {
  if (navigationRef.current && name) {
    navigationRef.current.navigate(name, params);
  }
};

export default {
  navigate,
};
