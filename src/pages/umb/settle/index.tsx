import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import SettleForm from './settle_form'

const UmbSettle: React.FunctionComponent = (): JSX.Element => {
  const WrappedSettleForm = Form.create({})(SettleForm)
  return (
    <Layout.Content className='page-umb-settle'>
      <Card className='settle-body' title='开通支付' bordered={false}>
        <WrappedSettleForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbSettle
