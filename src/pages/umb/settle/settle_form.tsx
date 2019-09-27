import { Button, Form, Input, notification } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Umb } from '../../../api'

interface IFormPropsWithRouter
  extends FormComponentProps,
    RouteComponentProps {}

const UmbSettleForm = (props: IFormPropsWithRouter) => {
  const [submitting, setSubmitting] = useState(false)
  const { getFieldDecorator, validateFieldsAndScroll } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Settle.query(params)
      setSubmitting(false)
      if (!data.errcode) {
        // success
        // cache params
        sessionStorage.chlmerid = data.data.chlmerid
        sessionStorage.chlcode = data.data.chlcode
        notification.success({
          btn: <Button onClick={hNext}>下一步</Button>,
          description: JSON.stringify(data),
          duration: null,
          message: '开通成功'
        })
      } else {
        // err
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
  const hNext = () => props.history.push('/umb/wechat')

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
