import { Icon, Layout } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Link, withRouter } from 'react-router-dom'
import HLMenu from './components/hl-menu'
import HLRouter from './components/router'
import './index.less'

const MenuWithRoute = withRouter(HLMenu)

interface IAppState {
  collapsed: boolean
}

class App extends React.Component<{}, IAppState> {
  public render() {
    const menu = [
      {
        children: [
          {
            key: 'umb-register',
            link: '/umb/register',
            text: '商户注册 CMS013'
          },
          { key: 'umb-bind', link: '/umb/bind', text: '商户绑卡 CMS012' },
          {
            key: 'umb-validate',
            link: '/umb/validate',
            text: '绑卡认证 CMS016（跳过）'
          },
          { key: 'umb-sign', link: '/umb/sign', text: '商户签约 CMS014' },
          { key: 'umb-settle', link: '/umb/settle', text: '开通支付 CMS011' },
          { key: 'umb-wechat', link: '/umb/wechat', text: '微信配置 CMS015' },
          { key: 'umb-modify', link: '/umb/modify', text: '修改信息 CMS018' }
        ],
        icon: 'bank',
        key: 'umb',
        text: '中投科信（民生）'
      },
      {
        children: [
          { key: 'other-crypto', link: '/other/crypto', text: '加解密测试' },
          { key: 'other-low-notice', link: '/other/low-notice', text: '发送低费通知' },
          {
            key: 'other-pay-reg',
            link: '/other/pay-reg',
            text: '支付信息录入'
          },
          { key: 'other-wx-msg', link: '/other/wx-msg', text: '微信推送录入' },
          { key: 'other-cmbc', link: '/other/cmbc', text: '民生支付接入' }
        ],
        icon: 'tool',
        key: 'other',
        text: '其他工具'
      }
    ]

    return (
      <Layout style={{ minHeight: '100vh', paddingLeft: '240px' }}>
        <Layout.Sider width={240} className='fixed-sider'>
          <div className='logo'>
            <Link to='/'>
              <Icon className='icon' type='fire' />
              <h1>e能家园工具</h1>
            </Link>
          </div>
          <MenuWithRoute menu={menu} />
        </Layout.Sider>
        <Layout>
          <HLRouter />
          <Layout.Footer className='page-footer'>
            Holley Inc. &copy;2019 All Rights Reserved.
          </Layout.Footer>
        </Layout>
      </Layout>
    )
  }
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
