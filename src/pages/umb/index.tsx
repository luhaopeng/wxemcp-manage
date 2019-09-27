import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import PageNotFound from '../not-found'

const CompRegister = lazy(() => import('./register'))
const CompBind = lazy(() => import('./bind'))
const CompValidate = lazy(() => import('./validate'))
const CompSign = lazy(() => import('./sign'))
const CompSettle = lazy(() => import('./settle'))

const PageUmb: React.FunctionComponent = (): JSX.Element => (
  <Suspense fallback={<PageHolder />}>
    <Switch>
      <Route path='/umb/register' component={CompRegister} />
      <Route path='/umb/bind' component={CompBind} />
      <Route path='/umb/validate' component={CompValidate} />
      <Route path='/umb/sign' component={CompSign} />
      <Route path='/umb/settle' component={CompSettle} />
      <Route component={PageNotFound} />
    </Switch>
  </Suspense>
)

export default PageUmb
