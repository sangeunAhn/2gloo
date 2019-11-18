import React, {Component} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

export default class MasonryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordsLoading: true,
    };
  }

  _onLoad = () => {
    const recordsLoading = this.state.recordsLoading;
    if (recordsLoading === true) {
      this.setState({recordsLoading: false});
    }
  };

  render() {
    return (
      <>
        <View id="logo" style={styles.container}>
          {this.state.recordsLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.leftView}>
            {Object.values(this.props.leftRecords).map((record, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  this.props.from == 'update'
                    ? this.props.RecordRegister(record.uri)
                    : this.props.goToPictures(record.uri)
                }>
                  <FastImage
                    key={index}
                    style={[
                      styles.record,
                      {
                        height: record.height,
                      },
                    ]}
                    source={{uri: record.uri}}
                    onLoad={this._onLoad()}
                  />
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={styles.rightView}>
            {Object.values(this.props.rightRecords).map((record, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() =>
                  this.props.from === 'update'
                    ? this.props.RecordRegister(record.uri)
                    : this.props.goToPictures(record.uri)
                }>
                  <FastImage
                    key={index}
                    style={[
                      styles.record,
                      {
                        height: record.height,
                      },
                    ]}
                    source={{uri: record.uri}}
                  />
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 7,
  },
  loading: {
    width,
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  record: {
    marginBottom: 11,
    borderRadius: 10,
    backgroundColor: 'gray'
  },
  leftView: {
    flex: 1,
    marginRight: 3.5, // backgroundColor: 'blue',
  },
  rightView: {
    flex: 1,
    marginLeft: 3.5, // backgroundColor: 'red',
  },
});
