import React from 'react';
import {connect} from 'react-redux';

export function withAuthen(WrappedComponent, navigationOption) {
  class WithAuthen extends React.Component {
    static navigationOptions = navigationOption;

    componentDidMount() {
      const {isLoginSuccess} = this.props;
      const {navigate} = this.props.navigation;
      if (!isLoginSuccess) {
        navigate('Login');
      }
    }
    componentDidUpdate(prevProps) {
      const {isLoginSuccess} = this.props;
      const {navigate} = this.props.navigation;
      if (!isLoginSuccess) {
        navigate('Login');
      }
    }

    render() {
      const {...rest} = this.props;
      return <WrappedComponent {...rest} />;
    }
  }

  const mapStateToProps = state => ({
    isLoginSuccess: state.auth.isLoginSuccess,
  });

  const mapDispatchToProps = dispatch => ({});

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WithAuthen);
}
