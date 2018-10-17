import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

// Components
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./containers/Home";
import About from "./containers/About";
import Login from "./containers/Login";
import Dashboard from "./containers/Dashboard";
import SignupRoutes from "./routes/SignupRoutes";
import NotFound from "./components/NotFound";

const Routes = () => (
  <AuthProvider>
    <BrowserRouter>
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignupRoutes} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default Routes;
