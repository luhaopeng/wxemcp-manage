import { Card, Form, Layout } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import './index.less'
import RegForm, { IFormProps } from './reg_form'

const UmbRegister = (props: RouteComponentProps): JSX.Element => {
  const WrappedRegForm = Form.create<IFormProps>({})(RegForm)
  const hNext = () => props.history.push('/umb/bind')
  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-reg-body' title='商户注册' bordered={false}>
        <WrappedRegForm next={hNext} />
      </Card>
    </Layout.Content>
  )
}

export default UmbRegister
