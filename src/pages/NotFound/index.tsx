import styles from './NotFound.module.scss'

import { NotFoundBlock } from '../../components/NotFoundBlock'

export const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <NotFoundBlock />
    </div>
  )
}
