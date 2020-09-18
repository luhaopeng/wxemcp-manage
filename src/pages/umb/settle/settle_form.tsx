import { Button, Form, Input, notification } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Umb } from '../../../api'
import { cleanObj } from '../../../utils'

export interface IFormProps extends FormComponentProps {
  next?: () => void
}

const UmbSettleForm = (props: IFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const { getFieldDecorator, validateFieldsAndScroll } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Settle.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        sessionStorage.chlmerid = data.data.chlmerid
        sessionStorage.chlcode = data.data.chlcode
        const key = `notify-${Date.now()}`
        const close = () => {
          notification.close(key)
          if (props.next) {
            props.next()
          }
        }
        notification.success({
          btn: <Button onClick={close}>下一步</Button>,
          description: JSON.stringify(data),
          duration: null,
          key,
          message: '开通成功'
        })
      } else {
        notification.error({
          description: JSON.stringify(data),
          message: '开通失败'
        })
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '开通异常'
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
          rules: [{ message: '请填写中投商户号', required: true }]
        })(<Input placeholder='注册时返回的merid' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='通道类型'>
        {getFieldDecorator('chltype', {
          initialValue: 'WEIXIN',
          rules: [{ message: '请填写通道类型', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='银行商户号'>
        {getFieldDecorator('mchid', {
          initialValue: '1507906251',
          rules: [{ message: '请填写银行商户号', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='渠道商户号'>
        {getFieldDecorator('channelid', {
          initialValue: '270836122',
          rules: [{ message: '请填写渠道商户号', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户名称'>
        {getFieldDecorator('mername', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户简称'>
        {getFieldDecorator('aliasname', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经营类目'>
        {getFieldDecorator('industryid', {
          initialValue: '165',
          rules: [{ message: '请填写经营类目', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='客服电话'>
        {getFieldDecorator('servtel', {
          rules: [
            { message: '请填写客服电话', required: true },
            { message: '客服电话只能是数字', pattern: /^\d+$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UmbSettleForm
