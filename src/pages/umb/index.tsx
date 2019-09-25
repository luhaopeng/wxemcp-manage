import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import PageNotFound from '../not-found'

const PageUmb: React.FunctionComponent = (): JSX.Element => (
  <Suspense fallback={PageHolder}>
    <Switch>
      <Route component={PageNotFound} />
    </Switch>
  </Suspense>
)

export default PageUmb
