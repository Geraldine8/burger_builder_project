import React from 'react';

import classes from './BuildControl.module.css'

const buildControls = (props) => (
  <div className={classes.BuildControl}>
    <div className={classess.Label}>{props.label}</div>
    <button className={classes.Less}>Less</button>
    <button classname={classes.More}>More</button> 
  </div>
);




export default buildcontrols;
