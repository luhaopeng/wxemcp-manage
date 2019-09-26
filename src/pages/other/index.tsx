import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageHolder from '../../components/page-holder'
import PageNotFound from '../not-found'

const CompCrypto = lazy(() => import('./crypto'))
const CompPayReg = lazy(() => import('./pay-reg'))
const CompWxMsg = lazy(() => import('./wx-msg'))

const PageOther: React.FunctionComponent = (): JSX.Element => (
  <Suspense fallback={<PageHolder />}>
    <Switch>
      <Route path='/other/crypto' component={CompCrypto} />
      <Route path='/other/pay-reg' component={CompPayReg} />
      <Route path='/other/wx-msg' component={CompWxMsg} />
      <Route component={PageNotFound} />
    </Switch>
  </Suspense>
)

export default PageOther
