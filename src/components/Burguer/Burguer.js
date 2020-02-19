import React from 'react';

import classes From './burguerIngredient.module.css';

const burguerIngredient = (props) => {
  let ingredient = null;

    swith (props.type){
      case('bread-bottom'):
        ingredient = <div className={classes.BreadBottom}></div;
        break;
      case('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seed1}></div>
            <div className={classes.Seed2}></div>
          </div>
        );
        break;
      case('meat'):
        ingredient = <div className={classes.Meat}></div>
        break;
      case('cheese'):
        ingredient = <div className={classes.Cheese}></div>
        break;
      case('salad'):
        ingredient = <div className={classes.Salad}></div>
        break;
      default:
        ingredient = null;
  }
  return ingredient;
};


export default burguerIngredient;
