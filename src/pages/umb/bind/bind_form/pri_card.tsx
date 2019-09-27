import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'

const FormPriCard = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  return (
    <React.Fragment>
      <Form.Item label='银行预留手机号'>
        {getFieldDecorator('prebankmobile', {
          rules: [{ message: '请填写手机号', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormPriCard
