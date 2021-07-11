import React, { FC } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ProtectedRoute from "./hooks/ProtectedRoute";
import {LayoutPage} from '../src/components/Layout';
import {Login} from './pages/Login';
import './App.css';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient()

const App: FC = () => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <ProtectedRoute path="/*" component={LayoutPage}/>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  </RecoilRoot>
);

export default App;