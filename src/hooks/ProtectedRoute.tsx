import React from "react";
import { Redirect, Route } from "react-router-dom";
import {sessionDataAtom} from "../store/authStore";
import { useRecoilState } from 'recoil';

type functionProps = {
  component: any,
  [x: string]: any
};


function ProtectedRoute({ component: Component, ...restOfProps }: functionProps) {
  
  const [sessionData] = useRecoilState(sessionDataAtom);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        sessionData.logged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
