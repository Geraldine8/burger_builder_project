import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import BurgueBuilder from './containers/BurguerBuilder/BurguerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgueBuilder/>
        </Layout>
      </div>
    )
  }
}

export default App;
