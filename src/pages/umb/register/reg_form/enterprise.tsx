import { Form, Input } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import React from 'react'
import ImgUploader, { IImgFile } from '../../../../components/img-uploader'
import { urlPrefix } from '../../../../utils/constants'

const uploadUrl = urlPrefix + '/umb/uploadImage'

const FormEnterprise = (props: FormComponentProps) => {
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
      <Form.Item label='税务登记证号'>
        {getFieldDecorator('taxregistrationno', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='组织机构代码证号码'>
        {getFieldDecorator('organizationalno', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='组织机构代码证有效期'>
        {getFieldDecorator('organizationalvalid', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='开户许可证号'>
        {getFieldDecorator('openingno', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='ICP许可证号/ICP备案号'>
        {getFieldDecorator('icpno', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='ICP许可证/ICP备案有效期'>
        {getFieldDecorator('icpvalid', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='专营资质行业许可证'>
        {getFieldDecorator('franchisedlicence', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='专营资质行业许可证有效期'>
        {getFieldDecorator('franchisedlicencevalid', {})(
          <Input autoComplete='off' />
        )}
      </Form.Item>
      <Form.Item label='经办人姓名'>
        {getFieldDecorator('operatorname', {
          rules: [{ message: '请填写经办人姓名', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经办人电话'>
        {getFieldDecorator('operatormobile', {
          rules: [{ message: '请填写经办人电话', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经办人邮箱'>
        {getFieldDecorator('operatoremail', {})(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经办人身份证号'>
        {getFieldDecorator('operatoreid', {
          rules: [{ message: '请填写身份证', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经办人身份证有效期'>
        {getFieldDecorator('operatoreidvalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='经办人身份证正面照'>
        {getFieldDecorator('operatoreidfrontphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='经办人身份证背面照'>
        {getFieldDecorator('operatoreidbackphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='法人姓名'>
        {getFieldDecorator('legalname', {
          rules: [{ message: '请填写法人姓名', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='法人身份证号'>
        {getFieldDecorator('legalid', {
          rules: [{ message: '请填写法人身份证', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='法人身份证有效期'>
        {getFieldDecorator('legalidvalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='法人身份证正面照'>
        {getFieldDecorator('legalidfrontphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='法人身份证背面照'>
        {getFieldDecorator('legalidbackphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='实际控制人姓名'>
        {getFieldDecorator('controllername', {
          rules: [{ message: '请填写实际控制人姓名', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='实际控制人身份证号'>
        {getFieldDecorator('controllerid', {
          rules: [{ message: '请填写实际控制人身份证', required: true }]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='实际控制人身份证有效期'>
        {getFieldDecorator('controlleridvalid', {
          rules: [
            { message: '请填写有效期', required: true },
            { message: '格式为yyyyMMdd', pattern: /^\d{8}$/ }
          ]
        })(<Input autoComplete='off' />)}
      </Form.Item>
      <Form.Item label='实际控制人身份证正面照'>
        {getFieldDecorator('controlleridfrontphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
      <Form.Item label='实际控制人身份证背面照'>
        {getFieldDecorator('controlleridbackphoto', {
          getValueFromEvent: uploader,
          valuePropName: 'list'
        })(<ImgUploader uploadUrl={uploadUrl} />)}
      </Form.Item>
    </React.Fragment>
  )
}

export default FormEnterprise
