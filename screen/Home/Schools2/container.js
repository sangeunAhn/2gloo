import React from 'react';
import Schools from './presenter';

class Container extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Schools
        {...this.props}
        onSwipeRight={this._onSwipeRight}
      />
    );
  }

}

export default Container;
