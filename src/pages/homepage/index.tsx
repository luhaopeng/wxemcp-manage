import { Layout, Typography } from 'antd'
import React from 'react'
import './index.less'

const { Paragraph, Title } = Typography

const PageHome: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content className='page-home'>
      <div className='welcome'>
        <Title level={2}>e能家园管理工具</Title>
        <Title level={4}>0.1.0</Title>
        <Paragraph>第一版</Paragraph>
      </div>
    </Layout.Content>
  )
}

export default PageHome
