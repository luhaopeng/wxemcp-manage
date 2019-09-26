import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import RegForm from './reg_form'

const OtherWxMsg: React.FunctionComponent = (): JSX.Element => {
  const WrappedRegForm = Form.create({})(RegForm)
  return (
    <Layout.Content className='page-umb-reg'>
      <Card className='reg-body' title='商户注册' bordered={false}>
        <WrappedRegForm />
      </Card>
    </Layout.Content>
  )
}

export default OtherWxMsg
