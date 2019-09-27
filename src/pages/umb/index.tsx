import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import PageNotFound from '../not-found'

const CompRegister = lazy(() => import('./register'))
const CompBind = lazy(() => import('./bind'))

const PageUmb: React.FunctionComponent = (): JSX.Element => (
  <Suspense fallback={<PageHolder />}>
    <Switch>
      <Route path='/umb/register' component={CompRegister} />
      <Route path='/umb/bind' component={CompBind} />
      <Route component={PageNotFound} />
    </Switch>
  </Suspense>
)

export default PageUmb
