import { Col, Layout, Row } from 'antd'
import React from 'react'
import './index.less'

const OtherCrypto: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content className='page-crypto'>
      <Row>
        <Col span={12}>1</Col>
        <Col span={12}>2</Col>
      </Row>
    </Layout.Content>
  )
}

export default OtherCrypto
