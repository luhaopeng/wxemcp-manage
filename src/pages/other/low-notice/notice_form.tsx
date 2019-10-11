import { Button, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Test } from '../../../api'
import { cleanObj } from '../../../utils'

const { Option } = Select

const LowNoticeForm = (props: FormComponentProps) => {
  const [submitting, setSubmitting] = useState(false)
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    resetFields,
    setFields
  } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Test.Notice.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        // success
        notification.success({
          description: JSON.stringify(data.data),
          duration: null,
          message: '发送成功'
        })
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
        } else {
          notification.error({
            description: JSON.stringify(data),
            message: '发送失败'
          })
        }
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '发送异常'
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
      <Form.Item label='推送类型'>
        {getFieldDecorator('msgType', {
          initialValue: '',
          rules: [{ message: '请选择推送类型', required: true }]
        })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='1'>低费通知</Option>
            <Option value='2'>低费通知（卡表）</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='指定企业'>
        {getFieldDecorator('eid', {
          rules: [{ message: 'id为纯数字', pattern: /^\d*$/ }]
        })(<Input placeholder='请填写企业id' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='指定用户'>
        {getFieldDecorator('customerid', {
          rules: [{ message: 'id为纯数字', pattern: /^\d*$/ }]
        })(<Input placeholder='请填写用户id' autoComplete='off' />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LowNoticeForm
