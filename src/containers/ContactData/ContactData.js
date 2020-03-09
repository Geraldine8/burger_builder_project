import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false
        },
        postCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Post Code'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
            maxLength: 6
          },
          valid: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Country'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false
          },


        email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false
          },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
              ]
            },
            value: '',
          },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
           formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false});
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({loading: false});
    });
  }

    checkValidity (value, rules){
      let isValid = true;

      if (rules.required) {
        // console.log(value);
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      return isValid;
    }



  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm //JS object
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({orderForm: updatedOrderForm});
  }
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" >Order</Button>
      </form>
    );
    if (this.state.loading){
      form = <Spinner/>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData
