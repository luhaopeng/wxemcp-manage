import { Card, Form, Layout } from 'antd'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import ValForm, { IFormProps } from './val_form'

const UmbValidate = (props: RouteComponentProps): JSX.Element => {
  const WrappedValForm = Form.create<IFormProps>({})(ValForm)
  const hNext = () => props.history.push('/umb/sign')

  return (
    <Layout.Content className='page-umb'>
      <Card className='umb-body' title='绑卡认证' bordered={false}>
        <WrappedValForm next={hNext} />
      </Card>
    </Layout.Content>
  )
}

export default UmbValidate
