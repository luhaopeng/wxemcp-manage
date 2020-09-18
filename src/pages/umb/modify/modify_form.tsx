import { Button, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Umb } from '../../../api'
import { cleanObj } from '../../../utils'

const { Option } = Select

const UmbWechatForm = (props: FormComponentProps) => {
  const [submitting, setSubmitting] = useState(false)
  const { getFieldDecorator, validateFieldsAndScroll } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Modify.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        notification.success({
          description: JSON.stringify(data),
          duration: null,
          message: '修改成功',
        })
      } else {
        notification.error({
          description: JSON.stringify(data),
          message: '修改失败',
        })
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '修改异常',
      })
    }
  }

  const hSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitForm(values)
      }
    })
  }

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={hSubmit}>
      <Form.Item label='中投商户号'>
        {getFieldDecorator('merid', {
          initialValue: sessionStorage.merid,
          rules: [{ message: '请填写中投商户号', required: true }],
        })(<Input placeholder='注册时返回的merid' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='通道编码'>
        {getFieldDecorator('chlcode', {
          initialValue: sessionStorage.chlcode || '',
          rules: [{ message: '请选择编码', required: true }],
        })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='Qr003'>Qr003</Option>
            <Option value='Qr004'>Qr004</Option>
          </Select>,
        )}
      </Form.Item>
      <Form.Item label='通道类型'>
        {getFieldDecorator('chltype', {
          initialValue: 'WEIXIN',
          rules: [{ message: '请填写通道类型', required: true }],
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户简称'>
        {getFieldDecorator('aliasname', {
          rules: [{ message: '请填写商户简称', required: true }],
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='客服电话'>
        {getFieldDecorator('servtel', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UmbWechatForm
