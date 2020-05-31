import React, { createContext, useState, Dispatch } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Login from './pages/Login';
import Home from './pages/Home';

const GlobalStyle = createGlobalStyle`
    * {
        outline: none;
    }

    body {
        margin: 0;
        display: flex;
        background: linear-gradient(160deg, transparent 80vh, #F3F4F5 80vh, white 100vh),
            linear-gradient(to bottom, #F3F4F5 160px, white 50vh), white;
        color: rgba(0,0,0,0.7);
        min-height: 100vh;
    }

    a {
        color: #2283d2;
    }

    a:focus, a:hover {
        color: #ff9764;
    }

    #root {
        flex: 1;
        display: flex;
        flex-direction: column;
        max-width: 100%;
    }
`;

export interface IUserState {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
}

export interface IAppState {
    user: IUserState;
    idToken: string;
    setUser: Dispatch<IUserState>;
    setIdToken: Dispatch<string>;
}

const AppState = createContext<IAppState>(null);

export const AppStateConsumer = AppState.Consumer;

export default function App() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState<IUserState>(savedUser);
    const [idToken, setIdToken] = useState<string>(localStorage.getItem('idToken'));

    return (
        <AppState.Provider
            value={{
                user, idToken, setUser, setIdToken,
            }}
        >
            <GlobalStyle />
            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </AppState.Provider>
    );
}
