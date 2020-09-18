import { Button, Divider, Form, Input, notification, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React, { useState } from 'react'
import { Umb } from '../../../../api'
import { cleanObj } from '../../../../utils'
import Enterprise from './enterprise'
import Individual from './individual'
import Micro from './micro'

const { Option } = Select

type CustomerType = '' | '1' | '2' | '3'
export interface IFormProps extends FormComponentProps {
  next?: () => void
}

const UmbRegForm = (props: IFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [cType, setCType] = useState('' as CustomerType)
  const { getFieldDecorator, validateFieldsAndScroll, setFields } = props.form

  const submitForm = async (params: object) => {
    try {
      setSubmitting(true)
      const { data } = await Umb.Register.query(cleanObj(params))
      setSubmitting(false)
      if (!data.errcode) {
        sessionStorage.merid = data.data.merid
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
          message: '注册成功'
        })
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
          notification.error({
            description: JSON.stringify(data),
            message: '注册失败'
          })
        }
      }
    } catch (err) {
      setSubmitting(false)
      notification.warning({
        description: err.message,
        message: '注册异常'
      })
    }
  }

  const hTypeChange = (v: CustomerType) => setCType(v)
  const hSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        sessionStorage.address = values.address
        submitForm(values)
      }
    })
  }

  const FormFragmentRenderer = () => {
    switch (cType) {
      case '1':
        return <Individual form={props.form} />
      case '2':
        return <Enterprise form={props.form} />
      case '3':
        return <Micro form={props.form} />
      case '':
      default:
        return null
    }
  }

  return (
    <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} onSubmit={hSubmit}>
      <Form.Item className='built-in' label='企业id'>
        {getFieldDecorator('eid', {
          rules: [
            { message: '请填写企业id', required: true },
            { message: '企业id应为纯数字', pattern: /^\d+$/g }
          ]
        })(<Input placeholder='与 obj_enterprise 一致' autoComplete='off' />)}
      </Form.Item>
      <Form.Item className='built-in' label='企业名称'>
        {getFieldDecorator('name', {
          rules: [{ message: '请填写企业名称', required: true }]
        })(<Input placeholder='与 obj_enterprise 一致' autoComplete='off' />)}
      </Form.Item>
      <Form.Item className='built-in' label='渠道手续费'>
        {getFieldDecorator('charge', {
          initialValue: '0.006',
          rules: [{ message: '请填写手续费', required: true }]
        })(<Input placeholder='默认0.6%即0.006' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='客户类型'>
        {getFieldDecorator('customertype', {
          initialValue: '',
          rules: [{ message: '请选择客户类型', required: true }]
        })(
          <Select onChange={hTypeChange}>
            <Option value=''>-- 请选择 --</Option>
            <Option value='1'>个体工商户</Option>
            <Option value='2'>企业商户</Option>
            <Option value='3'>小微商户</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='商户名称'>
        {getFieldDecorator('corname', {
          rules: [{ message: '请填写商户名称', required: true }]
        })(<Input placeholder='与银行账户名一致' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户简称'>
        {getFieldDecorator('shortname', {
          rules: [{ message: '请填写商户简称', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经营名称'>
        {getFieldDecorator('bussname', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='境内外标志'>
        {getFieldDecorator('overseas', { initialValue: '' })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='01'>境内</Option>
            <Option value='02'>境外</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='商户地址'>
        {getFieldDecorator('address', {
          initialValue: sessionStorage.address,
          rules: [{ message: '请填写商户地址', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='清算目标'>
        {getFieldDecorator('settletarget', {
          initialValue: '00'
        })(<Input readOnly={true} autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='清算周期'>
        {getFieldDecorator('settleperiod', {
          initialValue: '00'
        })(
          <Input
            placeholder='目前只支持T+1'
            readOnly={true}
            autoComplete='off'
          />
        )}
      </Form.Item>
      <Form.Item label='商户归属项目'>
        {getFieldDecorator('merBelong', { initialValue: '' })(
          <Select>
            <Option value=''>-- 请选择 --</Option>
            <Option value='00'>自有商户</Option>
            <Option value='01'>民生拓展商户</Option>
            <Option value='02'>其他</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label='商户拓展经理'>
        {getFieldDecorator('custManager', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='商户拓展经理所属机构'>
        {getFieldDecorator('custManagerOrg', {})(<Input autoComplete='off' />)}
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

export default UmbRegForm
