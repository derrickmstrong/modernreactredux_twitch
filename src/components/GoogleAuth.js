// Class-based GoogleAuth
// import React from 'react'

// class GoogleAuth extends React.Component {
//     state = { isSignedIn: null }

//     componentDidMount() {
//         window.gapi.load('client:auth2', () => {
//             window.gapi.client
//               .init({
//                 clientId:'393298322022-crqqujjp1q7rr0f4citnopp5diobg01e.apps.googleusercontent.com',
//                 scope: 'email',
//               })
//               .then(() => {
//                 this.auth = window.gapi.auth2.getAuthInstance();
//                 this.onAuthChange();
//                 this.auth.isSignedIn.listen(this.onAuthChange)
//               });
//     })
// }

// onAuthChange = () => {
//     this.setState({ isSignedIn: this.auth.isSignedIn.get() });
// };

// renderAuthButton() {
//     if (this.state.isSignedIn === null) {
//         return <div>Loading...</div>
//     } else if (this.state.isSignedIn) {
//         return (
//           <button
//             className='ui basic button'
//             onClick={() => window.gapi.auth2.getAuthInstance().signOut()}
//           >
//             <i className='icon user'></i> Sign Out
//           </button>
//         );
//     } else {
//         return (
//           <button
//             className='ui basic button'
//             onClick={() => window.gapi.auth2.getAuthInstance().signIn()}
//           >
//             <i className='icon user'></i> Sign In
//           </button>
//         );
//     }
// }
//     render() {
//         return (
//             <div>
//                 {this.renderAuthButton()}
//             </div>
//         )
//     }
// }

// export default GoogleAuth

import React, { useState, useEffect } from 'react';

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
          function onAuthChange() {
            setIsSignedIn(auth.isSignedIn.get());
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

export default GoogleAuth;
