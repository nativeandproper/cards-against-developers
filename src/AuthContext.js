import React from "react";
import produce from "immer";

import apiClient from "./lib/apiClient";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      checkingAuthentication: true,
      isAuthenticated: false
    };
  }

  removeAuthAndFinishCheck = () => {
    localStorage.removeItem("cah-token");
    
    this.setState(
      produce(draft => {
        draft.checkingAuthentication = false;
      })
    );
  };

  componentWillMount() {
    const authToken = localStorage.getItem("cah-token");

    if (!authToken) {
      this.setState(
        produce(draft => {
          draft.checkingAuthentication = false;
        })
      );
      
      return;
    }

    apiClient("GET", "/auth")
      .then(res => {
        if (res.is_authenticated) {
          this.setState(
            produce(draft => {
              draft.checkingAuthentication = false;
              draft.isAuthenticated = true;
            })
          );
        } else {
          this.removeAuthAndFinishCheck();
        }
      })
      .catch(_ => {
        this.removeAuthAndFinishCheck();
      });
  }

  setAuth = (isAuth) => {
    this.setState(
      produce(draft => {
        draft.isAuthenticated = isAuth;
      })
    );
  }

  render() {
    return (
      <AuthContext.Provider value={{
        checkingAuthentication: this.state.checkingAuthentication,
        isAuthenticated: this.state.isAuthenticated,
        setAuth: this.setAuth
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };