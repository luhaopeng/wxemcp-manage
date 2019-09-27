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
      <Form.Item label='验证码'>
        {getFieldDecorator('phonevercode', {
          rules: [
            { message: '请填写验证码', required: true },
            { message: '验证码为6位数字', pattern: /^\d{6}$/ }
          ]
        })(<Input placeholder='随意6位数字' autoComplete='off' />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormPriCard
