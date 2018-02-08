import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

/**
 *
 * @param {*} param0
 */

const PrivateRoute = ({ component: Component, state, path }) => {
  return (
    <Route
      {...path}
      render={(props) =>
        state.isAuth === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          )
      }
    />
  );
};

let mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(PrivateRoute);
