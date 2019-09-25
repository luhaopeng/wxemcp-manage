import { Button, Card, Col, Input, Layout, Row } from 'antd'
import React, { useState } from 'react'
import { Test } from '../../../api'
import './index.less'

const { TextArea } = Input

const OtherCrypto: React.FunctionComponent = (): JSX.Element => {
  const [toEncrypt, setToEncrypt] = useState('')
  const [encrypted, setEncrypted] = useState('')
  const [encrypting, setEncrypting] = useState(false)
  const [toDecrypt, setToDecrypt] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [decrypting, setDecrypting] = useState(false)

  const hInputEnc = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setToEncrypt(e.target.value)
  const hInputDec = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setToDecrypt(e.target.value)

  const hEncrypt = async () => {
    try {
      setEncrypting(true)
      const { data } = await Test.Encrypt.query({ str: toEncrypt })
      setEncrypting(false)
      setEncrypted(data.data)
    } catch (err) {
      setEncrypting(false)
      setEncrypted(err.message)
    }
  }
  const hDecrypt = async () => {
    try {
      setDecrypting(true)
      const { data } = await Test.Decrypt.query({ str: toDecrypt })
      setDecrypting(false)
      setDecrypted(data.data)
    } catch (err) {
      setDecrypting(false)
      setDecrypted(err.message)
    }
  }

  return (
    <Layout.Content className='page-crypto'>
      <Row gutter={16}>
        <Col span={12}>
          <Card title='加密' bordered={false}>
            <TextArea
              rows={4}
              placeholder='原文'
              value={toEncrypt}
              onChange={hInputEnc}
            />
            <Button
              className='coder-btn'
              type='primary'
              icon='arrow-down'
              loading={encrypting}
              onClick={hEncrypt}
            />
            <TextArea
              className='result-box'
              rows={4}
              value={encrypted}
              placeholder='密文'
              readOnly={true}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='解密' bordered={false}>
            <TextArea
              rows={4}
              placeholder='密文'
              value={toDecrypt}
              onChange={hInputDec}
            />
            <Button
              className='coder-btn'
              type='primary'
              icon='arrow-down'
              loading={decrypting}
              onClick={hDecrypt}
            />
            <TextArea
              className='result-box'
              rows={4}
              value={decrypted}
              placeholder='原文'
              readOnly={true}
            />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  )
}

export default OtherCrypto
