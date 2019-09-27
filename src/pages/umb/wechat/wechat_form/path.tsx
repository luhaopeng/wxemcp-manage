import { Form, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'

const { Option } = Select
const FormPath = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  return (
    <React.Fragment>
      <Form.Item label='配置信息'>
        {getFieldDecorator('cfginfo', {
          initialValue: '',
          rules: [{ message: '请选择目录', required: true }]
        })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='http://hl.energyman.cn/wxemcp/wx/#/'>
              生产目录
            </Option>
            <Option value='http://hl.energyman.cn/wxemcp/test/#/'>
              测试目录
            </Option>
          </Select>
        )}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormPath
