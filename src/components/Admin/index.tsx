import cn from 'classnames'
import { nanoid } from 'nanoid'
import { useState } from 'react'

import { Button } from '..'
import { data as dataDefault } from '../../assets/defaultData.ts'
import { fetchData } from '../../utils/fetchData.ts'
import { Modal } from '../Modal'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const [modalActive, setModalActive] = useState(false)

  const putFetch = async () => {
    await fetch('http://localhost:5172/pizzas/3', {
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
    const res = await fetch(import.meta.env.VITE_API_URL)
    const data = await res.json()

    const ids = data
      .reduce((id, pizza) => {
        id.push(pizza.id)
        return id
      }, [])
      .sort((a, b) => (Number(a) > Number(b) ? 1 : -1))
    console.log('ids', ids)

    for (let i = ids.length - 1; i >= 0; i--) {
      await fetch(import.meta.env.VITE_API_URL + `/${ids[i]}`, {
        method: 'DELETE',
      })
    }

    for (let i = 0; i < dataDefault.length; i++) {
      await fetch(import.meta.env.VITE_API_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(dataDefault[i]),
      })
    }
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
