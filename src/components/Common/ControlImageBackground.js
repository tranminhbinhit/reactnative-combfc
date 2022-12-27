import React from 'react';

import {ImageBackground, StyleSheet} from 'react-native';

export default class ControlImageBackground extends React.PureComponent {
  render() {
    return (
      <ImageBackground
        source={this.props.backgroundUrl}
        style={styles.container}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
});
