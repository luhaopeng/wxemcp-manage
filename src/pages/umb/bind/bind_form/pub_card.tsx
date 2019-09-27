import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'

const FormPubCard = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  return (
    <React.Fragment>
      <Form.Item label='银行名称'>
        {getFieldDecorator('bankname', {
          rules: [{ message: '请填写银行名称', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='银行代码'>
        {getFieldDecorator('bankcode', {
          rules: [{ message: '请填写银行代码', required: true }]
        })(
          <Input
            placeholder='请查阅 《银行简码（所有银行）.xlsx》'
            autoComplete='off'
          />
        )}
      </Form.Item>
      <Form.Item label='开户行所在省'>
        {getFieldDecorator('bankpro', {
          rules: [{ message: '请填写省份', required: true }]
        })(
          <Input
            placeholder='不带“省”或“自治区”，如 湖南，北京，内蒙古等'
            autoComplete='off'
          />
        )}
      </Form.Item>
      <Form.Item label='开户行所在市'>
        {getFieldDecorator('bankcity', {
          rules: [{ message: '请填写市区', required: true }]
        })(<Input placeholder='不带“市”字如 北京' autoComplete='off' />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormPubCard
