import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, logout } from "redux/actions/authAction";
import PageRender from "components/CustomRenderer/pageRender";
import PrivateRouter from "components/CustomRenderer/privateRouter";
import { getCustomers } from "redux/actions/customerAction";
import { useHistory } from "react-router-dom";
import Admin from "views/Admin";
import Login from "views/Login";
import { getOutputInvoices } from "redux/actions/outputInvoiceAction";
import { getServices } from "redux/actions/serviceAction";
import { getCompany } from "redux/actions/companyAction";
import { getInputInvoices } from "redux/actions/inputInvoiceAction";
import { getOffers } from "redux/actions/offerAction";
import Register from "views/Register";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getCompany(auth));
      dispatch(getCustomers(auth));
      dispatch(getServices(auth));
      dispatch(getOutputInvoices(auth));
      dispatch(getInputInvoices(auth));
      dispatch(getOffers(auth));
    }
    dispatch(refreshToken());
  }, [dispatch, auth.token]);


  return (
    <Router>
      <div className="App">
        <div className="main">
          <Switch>
            
            {/* Default path */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            {console.log(history.location)}
            { auth.token ? (
              <Route path="/admin" render={(props) => <Admin {...props} />} />
            ) : (
              <>
                <Redirect to="/login" />
                <Route path="/login" component={Login} />
                <Route path='/register' component={Register}/>
              </>
            
            )}
              
              <Redirect push to={
                auth.token ?
                (history.location.pathname === "/login" || history.location.pathname === "/register" || history.location.pathname === "/") ? "admin/dashboard"
                : history.location.pathname
                : "/login"
              } />

              {/* <Redirect to={
                auth.token ? 
                (history.location.pathname === "/login" || history.location.pathname === "/register" || history.location.pathname === "/") ? "admin/dashboard"
                : history.location.pathname
                : history.location.pathname
              } /> */}

          </Switch>
          
        </div>
      </div>
    </Router>
  );
};

//DEFAULT AND WOKRING
// {localStorage.getItem("tkn_fisco") ?
// <Route path="/admin" render={(props) => <Admin {...props} />}/>
// : <Route path="/login" component={Login} />}
// <Redirect to={auth.token ? "/admin/dashboard" : "/login"} />

export default App;
