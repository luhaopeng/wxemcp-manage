import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import MsgForm from './msg_form'

const OtherWxMsg: React.FunctionComponent = (): JSX.Element => {
  const WrappedMsgForm = Form.create({})(MsgForm)
  return (
    <Layout.Content className='page-wx-msg'>
      <Card className='msg-body' title='微信推送配置录入' bordered={false}>
        <WrappedMsgForm />
      </Card>
    </Layout.Content>
  )
}

export default OtherWxMsg
