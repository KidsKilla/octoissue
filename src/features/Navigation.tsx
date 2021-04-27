import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { IssuePage } from './pages/IssuePage'
import { IssueListPage } from './pages/IssueListPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export const Navigation: React.VFC = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/issues">
        <IssueListPage />
      </Route>
      <Route path="/issue/:issueId">
        <IssuePage />
      </Route>
      <Route path="*">
        <NotFoundPage />
      </Route>
    </Switch>
  )
}
