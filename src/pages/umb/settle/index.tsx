import { Card, Form, Layout } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import SettleForm, { IFormProps } from './settle_form'

const UmbSettle = (props: RouteComponentProps): JSX.Element => {
  const WrappedSettleForm = Form.create<IFormProps>({})(SettleForm)
  const hNext = () => props.history.push('/umb/wechat')
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='开通支付' bordered={false}>
        <WrappedSettleForm next={hNext} />
      </Card>
    </Layout.Content>
  )
}

export default UmbSettle
