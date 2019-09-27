import { Button, Divider, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Umb } from '../../../../api'
import FormAppid from './appid'
import FormPath from './path'

const { Option } = Select

type ConfigType = '' | 'appid' | 'path'
interface IFormPropsWithRouter
  extends FormComponentProps,
    RouteComponentProps {}

const UmbWechatForm = (props: IFormPropsWithRouter) => {
  const [submitting, setSubmitting] = useState(false)
  const [cType, setCType] = useState('' as ConfigType)
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    resetFields,
    setFields
  } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Wechat.query(params)
      setSubmitting(false)
      if (!data.errcode) {
        // success
        notification.success({
          description: JSON.stringify(data),
          duration: null,
          message: '配置成功'
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
          window.scrollTo({ behavior: 'smooth', top: 0 })
        } else {
          notification.error({
            description: JSON.stringify(data),
            message: '配置失败'
          })
        }
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '配置异常'
      })
    }
  }

  const hTypeChange = (v: ConfigType) => setCType(v)
  const hSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitForm(values)
      }
    })
  }

  const FormFragmentRenderer = () => {
    switch (cType) {
      case 'appid':
        return <FormAppid form={props.form} />
      case 'path':
        return <FormPath form={props.form} />
      case '':
      default:
        return null
    }
  }

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={hSubmit}>
      <Form.Item label='中投商户号'>
        {getFieldDecorator('merid', {
          initialValue: sessionStorage.merid,
          rules: [{ message: '请填写中投商户号', required: true }]
        })(<Input placeholder='注册时返回的merid' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='通道编码'>
        {getFieldDecorator('chlcode', {
          initialValue: '',
          rules: [{ message: '请选择编码', required: true }]
        })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='Qr003'>Qr003</Option>
            <Option value='Qr004'>Qr004</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='微信银行商户号'>
        {getFieldDecorator('mchid', {
          initialValue: '1507906251',
          rules: [{ message: '请填写微信商户号', required: true }]
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='微信子商户号'>
        {getFieldDecorator('chlmerid', {
          initialValue: sessionStorage.chlmerid,
          rules: [{ message: '请填写微信商户号', required: true }]
        })(<Input placeholder='条码支付开通时返回' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='配置类型'>
        {getFieldDecorator('cfgtype', {
          initialValue: '',
          rules: [{ message: '请选择配置类型', required: true }]
        })(
          <Select onChange={hTypeChange}>
            <Option value=''>-- 请选择 --</Option>
            <Option value='appid'>公众号appid配置</Option>
            <Option value='path'>公众号支付目录配置</Option>
          </Select>
        )}
      </Form.Item>
      <Divider dashed={true} />
      {FormFragmentRenderer()}
      <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
        <Button type='primary' htmlType='submit' loading={submitting}>
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UmbWechatForm
