import { Button, Form, Input, notification } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Umb } from '../../../api'

const UmbValForm = (props: FormComponentProps) => {
  const [submitting, setSubmitting] = useState(false)
  const { getFieldDecorator, validateFieldsAndScroll } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.SignParam.query(params)
      setSubmitting(false)
      if (!data.errcode) {
        // success
        createFormAndSubmit(data.data)
      } else {
        // err
        notification.error({
          description: JSON.stringify(data),
          message: '签约失败'
        })
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '签约异常'
      })
    }
  }
  const createFormAndSubmit = (data: string) => {
    const form = document.createElement('form')
    form.action = 'https://www.umbpay.cn/cmsmeraccess/trans/service.do'
    form.method = 'POST'
    form.style.display = 'none'
    const dataInput = document.createElement('input')
    dataInput.name = 'data'
    dataInput.type = 'text'
    dataInput.value = data
    form.appendChild(dataInput)
    document.body.appendChild(form)
    form.submit()
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
          rules: [{ message: '请填写中投商户号', required: true }]
        })(<Input placeholder='注册时返回的merid' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='验证令牌'>
        {getFieldDecorator('phonetoken', {
          initialValue: sessionStorage.token,
          rules: [{ message: '请填写验证令牌', required: true }]
        })(<Input placeholder='绑卡时返回的token' autoComplete='off' />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UmbValForm
