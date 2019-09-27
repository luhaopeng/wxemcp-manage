import { Button, Form, Input, message } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Test } from '../../../api'

interface IFormData {
  eid: string
  name: string
  appId: string
  appSecret: string
  tmplLow: string
  tmplLowIcm: string
  tmplRecharge: string
}

const WxMsgForm = (props: FormComponentProps) => {
  const [submitting, setSubmitting] = useState(false)
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    resetFields,
    setFields
  } = props.form

  const submitForm = async (params: IFormData) => {
    try {
      setSubmitting(true)
      const { data } = await Test.WxMsg.query(params)
      setSubmitting(false)
      if (!data.errcode) {
        // success
        message.success('插入成功')
        resetFields()
      } else {
        // err
        const reason: null | string = data.data
        if (reason) {
          const fields = reason.split('-')
          fields.forEach(f => {
            setFields({
              [f]: { errors: [new Error(data.errmsg)] }
            })
          })
          window.scrollTo({ behavior: 'smooth', top: 0 })
        } else {
          message.error(data.errmsg)
        }
      }
    } catch (err) {
      setSubmitting(false)
      message.error(err.message)
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
      <Form.Item label='企业id'>
        {getFieldDecorator('eid', {
          rules: [
            { message: '请填写企业id', required: true },
            { message: '企业id应为纯数字', pattern: /^\d+$/g }
          ]
        })(<Input placeholder='与 obj_enterprise 一致' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='企业名称'>
        {getFieldDecorator('name', {
          rules: [{ message: '请填写企业名称', required: true }]
        })(<Input placeholder='与 obj_enterprise 一致' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='开发者ID(AppID)'>
        {getFieldDecorator('appId', {
          rules: [{ message: '请填写AppID', required: true }]
        })(<Input placeholder='公众号 - 开发 - 基本配置' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='开发者密码(AppSecret)'>
        {getFieldDecorator('appSecret', {
          rules: [{ message: '请填写AppSecret', required: true }]
        })(<Input placeholder='公众号 - 开发 - 基本配置' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='模板id - 低费通知'>
        {getFieldDecorator('tmplLow', {})(
          <Input placeholder='用电账户余额不足提醒' autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='模板id - 低费通知(卡表)'>
        {getFieldDecorator('tmplLowIcm', {})(
          <Input placeholder='账户电量不足通知' autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='模板id - 购电通知(卡表)'>
        {getFieldDecorator('tmplRecharge', {})(
          <Input placeholder='充值通知' autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default WxMsgForm
