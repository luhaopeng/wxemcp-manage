import { Icon, Menu } from 'antd'
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

const { SubMenu } = Menu

interface IMenuItem {
  key: string
  text: string
  link?: string
  icon?: string
  children?: IMenuItem[]
}

interface IMenuProp extends RouteComponentProps {
  menu: IMenuItem[]
}

interface IMenuState {
  selectedKeys: string[]
}

export default class HLMenu extends React.Component<IMenuProp, IMenuState> {
  public static getDerivedStateFromProps(nextProps: IMenuProp): IMenuState {
    const { location } = nextProps
    const path = location.pathname.substr(1)
    const key = path.replace(/\//g, '-')
    return { selectedKeys: key ? [key] : ['homepage'] }
  }

  constructor(props: IMenuProp) {
    super(props)
    this.state = { selectedKeys: ['homepage'] }
  }

  public render() {
    const { menu } = this.props
    return (
      <Menu
        theme='dark'
        selectedKeys={this.state.selectedKeys}
        mode='inline'
      >
        {menu.map(item => this.buildMenuItem(item))}
      </Menu>
    )
  }

  private buildMenuItem: React.FunctionComponent = (
    item: IMenuItem
  ): JSX.Element => {
    if (item.children) {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.text}</span>
            </span>
          }
        >
          {item.children.map(subItem => this.buildMenuItem(subItem))}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.link ? item.link : '/'}>
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.text}</span>
          </Link>
        </Menu.Item>
      )
    }
  }
}
