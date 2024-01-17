import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import styles from './MainLayout.module.scss'

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
