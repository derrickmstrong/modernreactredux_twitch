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
//                 this.setState({ isSignedIn: this.auth.isSignedIn.get() });
//               });
//     })
// }
// renderAuthButton() {
//     if (this.state.isSignedIn === null) {
//         return <div>I don't know if we are signed in</div>
//     } else if (this.state.isSignedIn) {
//         return <div>I am signed in!</div>
//     } else {
//         return <div>I am not signed in</div>
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

import React, { useState, useEffect } from 'react'

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
        });
    });
    return () => {};
  }, []);

  const renderAuthButton = () => {
      if (isSignedIn === null) {
          return <div>I don't know if we are signed in</div>
      } else if (isSignedIn) {
          return <div>I am signed in!</div>
      } else {
          return <div>I am not signed in!</div>
      }
  }

  return <div>{renderAuthButton()}</div>;
}

export default GoogleAuth

