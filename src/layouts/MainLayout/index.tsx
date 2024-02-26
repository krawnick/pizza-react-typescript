import { Outlet } from 'react-router-dom'

import { Admin } from '../../components/Admin'
import { Header } from '../../components/Header'

import styles from './MainLayout.module.scss'

export const MainLayout = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Admin className={styles.admin} />
      <Header />
      <div className={styles.hiddenScrollbar}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
