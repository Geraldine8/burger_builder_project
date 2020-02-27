import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidUpdate (){
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      axios.interceptors.response.use(res => res, error => {
        this.setState({error: error})
      });
    }

    errorCorfimeHandler = () => {
      this.state({error: null})
    }

    render (){
      return (
        <Aux>
            <Modal
              show={this.state.error}
              modalClosed={this.errorCorfimeHandler}>
              {this.state.error ? this.state.message : null}
            </Modal>
          <WrappedComponent {...this.props}/>
        </Aux>
      );
    }
  }
}


export default withErrorHandler;
