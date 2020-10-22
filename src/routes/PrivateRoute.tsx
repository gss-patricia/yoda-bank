import React, { Component, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LocalStorageActions from "../store/actions/LocalStorageActions";
import { StorageState } from "../store/reducers/localStorageReducers";

const RoutesPrivate = ({ component, ...rest }: any) => {
  const dispatch = useDispatch();
  dispatch({
    type: LocalStorageActions.LOAD_LOCAL_STORAGE,
  });

  const { localStorageReducers }: any = useSelector(
    (state: StorageState) => state
  );

  const routeComponent = (props: any) =>
    localStorageReducers?.yoToken ? (
      React.createElement(component, props)
    ) : (
      <Redirect to="/login" />
    );
  return <Route {...rest} render={routeComponent} />;
};

export default RoutesPrivate;
