import { Card, Form, Layout } from 'antd'
import React from 'react'
import ModifyForm from './modify_form'

const UmbWechat: React.FunctionComponent = (): JSX.Element => {
  const WrappedModifyForm = Form.create({})(ModifyForm)
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='修改信息' bordered={false}>
        <WrappedModifyForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbWechat
