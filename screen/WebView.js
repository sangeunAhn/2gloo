import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class MyWeb extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {navigation} = this.props;
    var webUri = navigation.getParam('webUri', 'NO-ID');
    return (
      // <WebView
      //   source={{uri: webUri}}
      //   style={{marginTop: 20}}
      // />
      <> </>
    );
  }
}
