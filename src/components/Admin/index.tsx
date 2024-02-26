import cn from 'classnames'
import { useState } from 'react'

import { Modal } from '../Modal'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <div className={cn(className, styles.admin)}>
      <button onClick={() => setModalActive(true)}>ADMIN</button>
      {modalActive && (
        <Modal
          className={styles.modal}
          active={modalActive}
          setActive={setModalActive}
        >
          123
        </Modal>
      )}
    </div>
  )
}
