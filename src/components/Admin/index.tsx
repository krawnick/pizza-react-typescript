import cn from 'classnames'
import { useState } from 'react'

import { Button } from '..'
import { getData } from '../../hooks/useFetch.ts'
import { Modal } from '../Modal'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const [modalActive, setModalActive] = useState(false)

  const putFetch = async () => {
    await fetch('https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/3', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Кисло-сладкий цыпленок',
      }),
    })
  }

  const resetData = async () => {
    const data = await getData(
      'https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas'
    )
    console.log(data)
  }

  return (
    <div className={cn(className, styles.admin)}>
      <button className={styles.adminOpen} onClick={() => setModalActive(true)}>
        ADMIN
      </button>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.adminBody}>
            <Button onClick={resetData} appearance="default">
              Сбросить данные
            </Button>
            <Button onClick={putFetch} appearance="default">
              Обновить данные
            </Button>
            <Button appearance="default">Добавить данные</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
