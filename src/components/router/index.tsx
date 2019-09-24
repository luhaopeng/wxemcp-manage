import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import PageNotFount from '../../pages/not-found'
import PageHoder from '../page-holder'

const CompHome = lazy(() => import('../../pages/homepage'))

const HLRouter = () => {
  return (
    <Suspense fallback={<PageHoder />}>
      <Switch>
        <Route exact={true} path='/' component={CompHome} />
        <Route component={PageNotFount} />
      </Switch>
    </Suspense>
  )
}

export default HLRouter
