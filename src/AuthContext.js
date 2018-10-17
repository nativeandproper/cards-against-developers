import React from "react";
import produce from "immer";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  componentWillMount() {
    const authToken = localStorage.getItem("cah-token");

    if (authToken) {
      this.setState(
        produce(draft => {
          draft.isAuthenticated = true;
        })
      );
    }
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