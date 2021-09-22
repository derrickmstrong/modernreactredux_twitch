import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../store/actions';

const GoogleAuth = props => {
  console.log(props)
  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: `${process.env.REACT_APP_GOOGLE_AUTH}`,
          scope: 'email',
        })
        .then(() => {
          // Get auth instance from Google API
          const auth = window.gapi.auth2.getAuthInstance();
          // Check initial isSignedIn status
          onAuthChange(auth.isSignedIn.get());
          // Listen for changes in isSignedIn
          auth.isSignedIn.listen(onAuthChange);

          function onAuthChange(isSignedIn) {
            if (isSignedIn) {
              // Call signIn action from mapDispatchToProps
              props.setSignIn();
            } else {
              // Call signOut action from mapDispatchToProps
             props.setSignOut();
            }
          }
        });
    });
    return () => {};
  }, [props]);

  const onSignInClick = () => window.gapi.auth2.getAuthInstance().signIn();

  const onSignOutClick = () => window.gapi.auth2.getAuthInstance().signOut();

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return (
        <button className='ui red google button' onClick={onSignOutClick}>
          <i className='google icon'></i> Sign Out w/Google
        </button>
      );
    } else {
      return (
        <button className='ui blue google button' onClick={onSignInClick}>
          <i className='google icon'></i> Sign In w/Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn, // state from authReducer.js
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSignIn: () => dispatch(signIn()), // dispatch signIn from store/actions
    setSignOut: () => dispatch(signOut()) // dispatch signOut from store/actions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
