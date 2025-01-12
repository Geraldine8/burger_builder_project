import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from  '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });

  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuthenticated = useSelector(state => state.auth.token !== null);


  const onIngredientAdded = (ingName) => dispatch (actions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch (actions.removeIngredient(ingName));
  const onInitIngredient = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredient();
  }, [onInitIngredient]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]//el
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  const purchaseHandler = () => {
    if(isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      props.history.push('/auth');
    }

  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  }

    const disabledInfo = {
      ...ings
    };
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner /> ;

    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings}/>
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
            price={price}/>
        </Aux>
      );
      orderSummary = <OrderSummary
          ingredients={ings}
          price={price}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}/>
    }
    // if (this.state.loading) {
    //     orderSummary = <Spinner/>;
    // }
    //{salad: true, meat: false,...}
    return (
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
          {burger}
      </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);
