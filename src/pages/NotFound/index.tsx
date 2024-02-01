import { NotFoundBlock } from '../../components'

import styles from './NotFound.module.scss'

export const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <NotFoundBlock />
    </div>
  )
}
