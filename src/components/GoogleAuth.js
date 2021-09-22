import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { signIn, signOut } from '../store/actions';

const GoogleAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: `${process.env.REACT_APP_GOOGLE_AUTH}`,
          scope: 'email',
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
          function onAuthChange(isSignedIn) {
            if (isSignedIn) {
                signIn()
            } else {
                signOut()
            }
          }
        });
    });
    return () => {};
  }, []);

  const onSignInClick = () => window.gapi.auth2.getAuthInstance().signIn();

  const onSignOutClick = () => window.gapi.auth2.getAuthInstance().signOut();

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    } else if (isSignedIn) {
      return (
        <button
          className='ui red google button'
          onClick={onSignOutClick}
        >
          <i className='google icon'></i> Sign Out w/Google
        </button>
      );
    } else {
      return (
        <button
          className='ui blue google button'
          onClick={onSignInClick}
        >
          <i className='google icon'></i> Sign In w/Google
        </button>
      );
    }
  };

  return <div>{renderAuthButton()}</div>;
};

export default connect(null, { signIn, signOut })(GoogleAuth);
