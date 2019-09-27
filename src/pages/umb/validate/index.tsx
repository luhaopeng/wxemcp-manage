import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import ValForm from './val_form'

const UmbValidate: React.FunctionComponent = (): JSX.Element => {
  const WrappedValForm = Form.create({})(ValForm)
  return (
    <Layout.Content className='page-umb-val'>
      <Card className='val-body' title='绑卡认证' bordered={false}>
        <WrappedValForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbValidate
