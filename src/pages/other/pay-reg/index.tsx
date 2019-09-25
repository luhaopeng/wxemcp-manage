import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import RegForm from './reg_form'

const OtherPayReg: React.FunctionComponent = (): JSX.Element => {
  const WrappedRegForm = Form.create({})(RegForm)
  return (
    <Layout.Content className='page-pay-reg'>
      <Card className='reg-body' title='支付信息录入' bordered={false}>
        <WrappedRegForm />
      </Card>
    </Layout.Content>
  )
}

export default OtherPayReg
