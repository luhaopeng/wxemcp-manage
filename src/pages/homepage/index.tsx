import { Layout, Typography } from 'antd'
import React from 'react'
import './index.less'

const { Paragraph, Text, Title } = Typography

const PageHome: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout.Content className='page-home'>
      <div className='welcome'>
        <Title level={2}>e能家园管理工具</Title>
        <Title level={4}>0.1.2</Title>
        <Paragraph>
          <Text type='secondary'>2019-10-11</Text>
          <br />
          <ol>
            <li>新增“发送低费通知”页面</li>
          </ol>
        </Paragraph>
        <Title level={4}>0.1.1</Title>
        <Paragraph>
          <Text type='secondary'>2019-10-09</Text>
          <ol>
            <li>修复提交表单时，可空字段为undefined的错误</li>
            <li>暂时使用区分字段（P/E/M）</li>
            <li>修复“下一步”点击错误</li>
            <li>修复“微信配置”通道编码未自动填充的问题</li>
          </ol>
        </Paragraph>
        <Title level={4}>0.1.0</Title>
        <Paragraph>
          <Text type='secondary'>2019-09-25</Text>
          <br />
          第一版
        </Paragraph>
      </div>
    </Layout.Content>
  )
}

export default PageHome
