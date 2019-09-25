import { Button, Card, Col, Input, Layout, Row } from 'antd'
import React from 'react'
import './index.less'

const { TextArea } = Input

const OtherCrypto: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content className='page-crypto'>
      <Row gutter={16}>
        <Col span={12}>
          <Card title='加密' bordered={false}>
            <TextArea rows={4} placeholder='原文' />
            <Button className='coder-btn' type='primary' icon='arrow-down' />
            <TextArea
              className='result-box'
              rows={4}
              placeholder='密文'
              readOnly={true}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='解密' bordered={false}>
            <TextArea rows={4} placeholder='密文' />
            <Button className='coder-btn' type='primary' icon='arrow-down' />
            <TextArea
              className='result-box'
              rows={4}
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
