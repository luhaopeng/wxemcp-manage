import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'
import ImgUploader, { IImgFile } from '../../../../components/img-uploader'
import { urlPrefix } from '../../../../utils/constants'

const uploadUrl = urlPrefix + '/umb/uploadImage'

const FormIndividual = (props: FormComponentProps) => {
  const { getFieldDecorator } = props.form

  const uploader = (e: IImgFile[]) => e[0] && e[0].imgId

  return (
    <React.Fragment>
      <Form.Item label='营业执照号'>
        {getFieldDecorator('businesslicenseno', {
          rules: [{ message: '请填写营业执照号', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='营业执照有效期'>
        {getFieldDecorator('businesslicensevalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input placeholder='长期则填写30991231' autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='营业执照照片'>
        {getFieldDecorator('businesslicensephoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='经营者姓名'>
        {getFieldDecorator('managername', {
          rules: [{ message: '请填写经营者姓名', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经营者身份证号'>
        {getFieldDecorator('managerid', {
          rules: [{ message: '请填写身份证号', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经营者身份证有效期'>
        {getFieldDecorator('manageridvalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经营者手持身份证照片'>
        {getFieldDecorator('managerhandleidphoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='经营者结算银行卡照片'>
        {getFieldDecorator('managerhandlebankphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='特殊经营行业许可证号码'>
        {getFieldDecorator('specialbusinesslicense', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='特殊经营行业许可证有效期'>
        {getFieldDecorator('specialbusinessvalid', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='店铺门牌照片'>
        {getFieldDecorator('storephoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='收银台照片'>
        {getFieldDecorator('cashierdeskphoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='店铺内照片'>
        {getFieldDecorator('storeinsidephoto', {
          getValueFromEvent: uploader,
          rules: [{ message: '请选择图片', required: true }],
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormIndividual
