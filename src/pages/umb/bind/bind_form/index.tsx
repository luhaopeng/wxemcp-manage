import { Button, Divider, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Umb } from '../../../../api'
import { cleanObj } from '../../../../utils'
import FormPri from './pri_card'
import FormPub from './pub_card'

const { Option } = Select

type AccountType = '' | '00' | '01'
export interface IFormProps extends FormComponentProps {
  next?: () => void
}

const UmbBindForm = (props: IFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [aType, setAType] = useState('' as AccountType)
  const { getFieldDecorator, validateFieldsAndScroll } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Bind.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        // success
        sessionStorage.token = data.data.token
        // notify
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
          message: '绑卡成功'
        })
      } else {
        // err
        notification.error({
          description: JSON.stringify(data),
          message: '绑卡失败'
        })
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '绑卡异常'
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
      <Form.Item label='账户名称'>
        {getFieldDecorator('accountname', {
          rules: [{ message: '请填写账户名称', required: true }]
        })(<Input placeholder='银行账户开户名' autoComplete='off' />)}
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

export default UmbBindForm
