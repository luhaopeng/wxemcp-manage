import { Card, Form, Layout } from 'antd'
import React from 'react'
import WechatForm from './wechat_form'

const UmbWechat: React.FunctionComponent = (): JSX.Element => {
  const WrappedWechatForm = Form.create({})(WechatForm)
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='微信配置' bordered={false}>
        <WrappedWechatForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbWechat
