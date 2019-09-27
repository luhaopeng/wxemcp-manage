import { Card, Form, Layout } from 'antd'
import React from 'react'
import SignForm from './sign_form'

const UmbSign: React.FunctionComponent = (): JSX.Element => {
  const WrappedSignForm = Form.create({})(SignForm)
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='商户签约' bordered={false}>
        <WrappedSignForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbSign
