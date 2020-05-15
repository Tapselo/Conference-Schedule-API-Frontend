import React from 'react'
import {Switch, Route} from "react-router-dom";
import {LoginPage} from './components/users/LoginPage'
import {Page404} from './components/Page404'
import {CreateAccount} from './components/users/CreateAccount'
import {UpdateAccount} from "./components/users/UpdateAccount"
import {AboutUser} from './components/users/AboutUser'
import PresentationsList from "./components/presentations/PresentationsList"
import {RemindersList} from "./components/reminders/RemindersList";

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={PresentationsList}>
                </Route>
                <Route exact path="/user/login" component={LoginPage}>
                </Route>
                <Route exact path="/user/register" component={CreateAccount}>
                </Route>
                <Route exact path="/user/update" component={UpdateAccount}>
                </Route>
                <Route exact path="/user/me" component={AboutUser}>
                </Route>
                <Route exact path="/reminders" component={RemindersList}>
                </Route>
                <Route component={Page404}/>
            </Switch>
        </>
    )
};