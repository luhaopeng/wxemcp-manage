import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'

const FormPubCard = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  return (
    <React.Fragment>
      <Form.Item label='校验金打款额'>
        {getFieldDecorator('tranamt', {
          rules: [{ message: '请填写校验金额', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormPubCard
