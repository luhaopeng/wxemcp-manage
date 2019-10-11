import { Card, Form, Layout } from 'antd'
import React from 'react'
import './index.less'
import NoticeForm from './notice_form'

const OtherNotice: React.FunctionComponent = (): JSX.Element => {
  const WrappedRegForm = Form.create({})(NoticeForm)
  return (
    <Layout.Content className='page-notice'>
      <Card className='reg-body' title='重发低费通知' bordered={false}>
        <WrappedRegForm />
      </Card>
    </Layout.Content>
  )
}

export default OtherNotice
