import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageNotFount from '../../pages/not-found'
import PageHoder from '../page-holder'

const CompHome = lazy(() => import('../../pages/homepage'))
const CompOther = lazy(() => import('../../pages/other'))
const CompUmb = lazy(() => import('../../pages/umb'))

const HLRouter = () => {
  return (
    <Suspense fallback={<PageHoder />}>
      <Switch>
        <Route exact={true} path='/' component={CompHome} />
        <Route path='/umb' component={CompUmb} />
        <Route path='/other' component={CompOther} />
        <Route component={PageNotFount} />
      </Switch>
    </Suspense>
  )
}

export default HLRouter
