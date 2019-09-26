import { Button, message, Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { RcFile, UploadFile } from 'antd/lib/upload/interface'
import React, { forwardRef, RefObject, useState } from 'react'

interface IImgFile extends UploadFile {
  imgId: string
}
interface IUploaderProps {
  onChange?: (list: IImgFile[]) => void
  list?: string
  listSize?: number
  uploadUrl: string
}

const ImgUploader = (props: IUploaderProps, ref: RefObject<Upload>) => {
  const [fileList, setFileList] = useState([] as IImgFile[])

  const hBeforeUpload = (file: RcFile) => {
    const isLessThan2M = file.size / 1024 / 1024 < 2
    if (!isLessThan2M) {
      message.error('照片大小应不超过 2MB!')
    }
    return isLessThan2M
  }
  const hPickFile = (e: UploadChangeParam<IImgFile>) => {
    const size = props.listSize || 1
    let list = e.fileList.slice(-size)
    list = list.map(f => {
      if (f.response && !f.response.errcode) {
        f.imgId = f.response.data
      }
      return f
    })
    setFileList(list)

    const { onChange } = props
    if (onChange) {
      onChange(list)
    }
  }

  return (
    <Upload
      ref={ref}
      accept='image/*'
      name='img'
      action={props.uploadUrl}
      listType='picture'
      fileList={fileList}
      onChange={hPickFile}
      beforeUpload={hBeforeUpload}
    >
      <Button icon='upload'>上传图片</Button>
    </Upload>
  )
}

const WrapRefToUploader = forwardRef(ImgUploader)

export { WrapRefToUploader as default, IImgFile }
