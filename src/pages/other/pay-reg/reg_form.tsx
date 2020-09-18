import { Button, Form, Input, message, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Test } from '../../../api'
import { cleanObj } from '../../../utils'

const { Option } = Select
const { TextArea } = Input

interface IFormData {
  eid: string
  name: string
  wxMchId: string
  aliAppId: string
  aliPri: string
  aliPub: string
  channel: string
}

const PayRegForm = (props: FormComponentProps) => {
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
      const { data } = await Test.PayReg.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        message.success('插入成功')
        resetFields()
      } else {
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
      <Form.Item label='接入方式' required={true}>
        {getFieldDecorator('channel', { initialValue: '1' })(
          <Select>
            <Option value='1'>常规</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='微信商户号'>
        {getFieldDecorator('wxMchId', {
          rules: [{ message: '商户号为10位纯数字', pattern: /^\d{10}$/g }]
        })(<Input placeholder='10位纯数字' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='支付宝appid'>
        {getFieldDecorator('aliAppId', {
          rules: [{ message: 'appid为16位纯数字', pattern: /^\d{16}$/g }]
        })(<Input placeholder='16位纯数字' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户私钥'>
        {getFieldDecorator('aliPri', {
          rules: [{ message: '私钥原文为1624位字符串', len: 1624 }]
        })(<TextArea rows={5} placeholder='1624位字符串' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='支付宝公钥'>
        {getFieldDecorator('aliPub', {
          rules: [{ message: '支付宝公钥原文为392位字符串', len: 392 }]
        })(<TextArea rows={4} placeholder='392位字符串' autoComplete='off' />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default PayRegForm
