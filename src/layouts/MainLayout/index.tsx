import { Outlet } from 'react-router-dom'

import styles from './MainLayout.module.scss'

import { Header } from '../../components/Header'

export const MainLayout = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
