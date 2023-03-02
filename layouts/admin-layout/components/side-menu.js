import styled, { css } from 'styled-components'
import Logo from './logo'
import { MenuGroup, MenuItem } from './menu-items'
import {
  BookOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { LayoutContext } from '../../../context/layout.context'
import { TbApps } from 'react-icons/tb'
import { RiApps2Line } from 'react-icons/ri'
import { MdOutlineCategory } from 'react-icons/md'
import { CgWebsite } from 'react-icons/cg'
import { useContext } from 'react'
import { containerPadding } from './utils-styles'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

// styles
const StyledSideMenu = styled.aside`
  transition: width 0.4s;
  width: ${(props) => {
    if (props.sideOpen === true)
      return props.theme.layout.side_uncollapsed_width
    else return props.theme.layout.side_collapsed_width
  }};
  position: fixed;
  top: 0;
  height: 100%;
  border-inline-end: 1px solid ${(props) => props.theme.colors.secondary};
`

const StyledMenuContainer = styled.div`
  display: block;
  overflow-y: auto;
  box-shadow: 1px -1px 5px 0px rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 1px -1px 5px 0px rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow: 1px -1px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${containerPadding}
`

const StyledSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${containerPadding}
`

export default function SideMenu() {
  const router = useRouter()

  const { t } = useTranslation('common')

  const locale = router.locale

  const { sideOpen } = useContext(LayoutContext)

  return (
    <StyledSideMenu sideOpen={sideOpen}>
      <div className="flex flex-col h-full">
        <Logo
          src={'/media/dahir/logo2.png'}
          title="Homaco"
          sideOpen={sideOpen}
        />
        <StyledMenuContainer>
          <MenuGroup title={t('layout.analytics')}>
            <MenuItem
              href="/admin"
              title={t('layout.home')}
              icon={<HomeOutlined />}
              active={router.pathname === '/admin'}
            />
          </MenuGroup>
          <MenuGroup title={t('layout.management')}>
            <MenuItem
              href="/admin/categories"
              title={t('layout.category')}
              icon={<MdOutlineCategory />}
              active={router.pathname.startsWith('/admin/categories')}
            />
            <MenuItem
              href="/admin/clients"
              title={t('layout.clients')}
              icon={<MdOutlineCategory />}
              active={router.pathname.startsWith('/admin/clients')}
            />
            <MenuItem
              href="/admin/products"
              title={t('layout.products')}
              icon={<RiApps2Line />}
              active={router.pathname.startsWith('/products')}
            />
            <MenuItem
              href="/admin/products/product"
              title={t('layout.products')}
              icon={<TbApps />}
              active={router.pathname.startsWith('/products/product')}
            />
            <MenuItem
              href="/admin/banners"
              title={t('layout.banners')}
              icon={<PlayCircleOutlined />}
              active={router.pathname.startsWith('/admin/banners')}
            />
            <MenuItem
              href="/admin/partners"
              title={t('Partners')}
              icon={<PlayCircleOutlined />}
              active={router.pathname.startsWith('/admin/partners')}
            />
          </MenuGroup>
          {/* <MenuGroup title={t('layout.websiteManagement')}>
          </MenuGroup> */}
        </StyledMenuContainer>
        <StyledSettingsContainer noFlex={true}>
          <MenuItem
            href="/admin/settings"
            title={t('layout.settings')}
            icon={<SettingOutlined />}
            active={router.pathname.startsWith('/admin/settings')}
          />
          <MenuItem
            href="#"
            title={t('layout.logout')}
            icon={<LogoutOutlined />}
          />
        </StyledSettingsContainer>
      </div>
    </StyledSideMenu>
  )
}
