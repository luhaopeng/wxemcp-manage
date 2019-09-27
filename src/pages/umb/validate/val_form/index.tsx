import { Button, Divider, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { Umb } from '../../../../api'
import FormPri from './pri_card'
import FormPub from './pub_card'

const { Option } = Select

type AccountType = '' | '00' | '01'
interface IFormPropsWithRouter
  extends FormComponentProps,
    RouteComponentProps {}

const UmbValForm = (props: IFormPropsWithRouter) => {
  const [submitting, setSubmitting] = useState(false)
  const [aType, setAType] = useState('' as AccountType)
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    resetFields,
    setFields
  } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Validate.query(params)
      setSubmitting(false)
      if (!data.errcode) {
        // success
        sessionStorage.token = data.data.token
        notification.success({
          btn: <Button onClick={hNext}>下一步</Button>,
          description: JSON.stringify(data),
          duration: null,
          message: '认证成功'
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
            message: '认证失败'
          })
        }
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '认证异常'
      })
    }
  }

  const hTypeChange = (v: AccountType) => setAType(v)
  const hSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        submitForm(values)
      }
    })
  }
  const hNext = () => props.history.push('/umb/sign')

  const FormFragmentRenderer = () => {
    switch (aType) {
      case '00':
        return <FormPri form={props.form} />
      case '01':
        return <FormPub form={props.form} />
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
      <Form.Item label='账户号码'>
        {getFieldDecorator('accountno', {
          rules: [{ message: '请填写账户号码', required: true }]
        })(<Input placeholder='银行账户号码' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='账户类型'>
        {getFieldDecorator('accounttype', {
          initialValue: '',
          rules: [{ message: '请选择账户类型', required: true }]
        })(
          <Select onChange={hTypeChange}>
            <Option value=''>-- 请选择 --</Option>
            <Option value='00'>对私</Option>
            <Option value='01'>对公</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='验证令牌'>
        {getFieldDecorator('phonetoken', {
          initialValue: sessionStorage.token,
          rules: [{ message: '请填写验证令牌', required: true }]
        })(<Input placeholder='绑卡时返回的token' autoComplete='off' />)}
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

export default UmbValForm
