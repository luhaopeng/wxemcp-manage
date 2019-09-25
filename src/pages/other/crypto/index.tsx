import { Button, Card, Col, Input, Layout, Row, Select } from 'antd'
import React, { useState } from 'react'
import { Test } from '../../../api'
import './index.less'

const { TextArea } = Input
const { Option } = Select

const OtherCrypto: React.FunctionComponent = (): JSX.Element => {
  const [cryptoType, setCryptoType] = useState('wxemcp')
  const [toEncrypt, setToEncrypt] = useState('')
  const [encrypted, setEncrypted] = useState('')
  const [encrypting, setEncrypting] = useState(false)
  const [toDecrypt, setToDecrypt] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [decrypting, setDecrypting] = useState(false)

  const hCryptoType = (v: string) => setCryptoType(v)
  const hInputEnc = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setToEncrypt(e.target.value)
  const hInputDec = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setToDecrypt(e.target.value)

  const hEncrypt = async () => {
    try {
      setEncrypting(true)
      const { data } = await Test.Encrypt.query({
        str: toEncrypt,
        type: cryptoType
      })
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
      const { data } = await Test.Decrypt.query({
        str: toDecrypt,
        type: cryptoType
      })
      setDecrypting(false)
      setDecrypted(data.data)
    } catch (err) {
      setDecrypting(false)
      setDecrypted(err.message)
    }
  }

  return (
    <Layout.Content className='page-crypto'>
      <Select className='crypto-type' value={cryptoType} onChange={hCryptoType}>
        <Option value='wxemcp'>公众号 - 支付信息</Option>
        <Option value='emc'>Web - 用户密码/jdbc密码</Option>
      </Select>
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
