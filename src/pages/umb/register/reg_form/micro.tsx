import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'
import ImgUploader, { IImgFile } from '../../../../components/img-uploader'
import { urlPrefix } from '../../../../utils/constants'

const uploadUrl = urlPrefix + '/umb/uploadImage'

const FormMicro = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  const uploader = (e: IImgFile[]) => e[0] && e[0].imgId

  return (
    <React.Fragment>
      <Form.Item label='负责人身份证号'>
        {getFieldDecorator('responsibleid', {
          rules: [{ message: '请填写身份证号', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='负责人身份证有效期'>
        {getFieldDecorator('responsibleidvalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='负责人身份证正面照'>
        {getFieldDecorator('responsibleidfrontphoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='负责人身份证背面照'>
        {getFieldDecorator('responsibleidbackphoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='店铺门牌照片'>
        {getFieldDecorator('storephotoM', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='店铺内照片'>
        {getFieldDecorator('storeinsidephotoM', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormMicro
