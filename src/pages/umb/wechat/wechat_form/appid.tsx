import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'

const FormAppid = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  return (
    <React.Fragment>
      <Form.Item label='配置信息'>
        {getFieldDecorator('cfginfo', {
          initialValue: 'wx9881a033828453e0',
          rules: [{ message: '请填写appid', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormAppid
