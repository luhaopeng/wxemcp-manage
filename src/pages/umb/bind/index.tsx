import { Card, Form, Layout } from 'antd'
import React from 'react'
import BindForm from './bind_form'

const UmbBind: React.FunctionComponent = (): JSX.Element => {
  const WrappedBindForm = Form.create({})(BindForm)
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='商户绑卡' bordered={false}>
        <WrappedBindForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbBind
