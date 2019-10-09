import { Card, Form, Layout } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import BindForm, { IFormProps } from './bind_form'

const UmbBind = (props: RouteComponentProps): JSX.Element => {
  const WrappedBindForm = Form.create<IFormProps>({})(BindForm)
  const hNext = () => props.history.push('/umb/sign')
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='商户绑卡' bordered={false}>
        <WrappedBindForm next={hNext} />
      </Card>
    </Layout.Content>
  )
}

export default UmbBind
