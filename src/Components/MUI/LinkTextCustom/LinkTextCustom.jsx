import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Link } from '@mui/material';
import { collectJsonValues } from 'helpers/collectJsonValues';
import { useActions } from 'helpers/useEvents'

import classes from './LinkTextCustom.module.css';

const StyledLink = styled(Link).attrs((props) => props.properties)`
  ${(props) => props.styles}
`;
function LinkTextCustom({ globalId, props, children }) {
  const [, setRerender] = useState(false);

  const { actions, properties, style } = props;
  const jsonStyles = collectJsonValues(style);
  const jsonProperties = collectJsonValues(properties);
  const { lefticon, righticon, label } = jsonProperties;

  const { events } = useActions(actions);

  useEffect(() => {
    const timer = setInterval(() => {
      setRerender((prev) => !prev);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div id={globalId} className={classes.wrapper} {...events}>
      {lefticon && children[0]}
      <StyledLink properties={jsonProperties} styles={jsonStyles}>
        {label}
      </StyledLink>
      {righticon && children[1]}
    </div>
  );
}

LinkTextCustom.propTypes = {
  props: PropTypes.object.isRequired,
  globalId: PropTypes.number.isRequired,
  style: PropTypes.array,
  label: PropTypes.string,
  properties: PropTypes.array,
  children: PropTypes.array,
};

export default LinkTextCustom;
