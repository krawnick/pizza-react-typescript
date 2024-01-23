import { NotFoundBlock } from '../../components/NotFoundBlock'

import styles from './NotFound.module.scss'


export const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <NotFoundBlock />
    </div>
  )
}
