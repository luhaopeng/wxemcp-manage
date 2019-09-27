import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import WechatForm from './wechat_form'

const UmbWechat: React.FunctionComponent = (): JSX.Element => {
  const WrappedWechatForm = Form.create({})(WechatForm)
  return (
    <Layout.Content className='page-umb-wechat'>
      <Card className='wechat-body' title='微信配置' bordered={false}>
        <WrappedWechatForm />
      </Card>
    </Layout.Content>
  )
}

export default UmbWechat
