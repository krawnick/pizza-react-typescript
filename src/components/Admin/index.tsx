import cn from 'classnames'
import { useState } from 'react'

import { Button } from '..'
import { data as dataDefault } from '../../assets/defaultData.ts'
import { useToggle } from '../../hooks/useToggle.ts'
import { selectorFilter } from '../../redux/slices/filter/selectors.ts'
import { IPizzas } from '../../redux/slices/pizzas/types.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store.ts'
import { fetchWithParams } from '../../utils/fetchWithParams.ts'
import { FormUpdate } from '../FormUpdate/index.tsx'
import { Modal } from '../Modal'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { paginationState, searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  const [modalActive, setModalActive] = useState(true)
  const [openUpdate, setOpenUpdate] = useToggle()

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
    try {
      const res = await fetch(import.meta.env.VITE_API_URL)
      const data = await res.json()

      if (!res.ok) {
        throw new Error('Что-то не так. Повторите через минуту.')
      }

      const ids = data
        .reduce((id: string[], pizza: IPizzas) => {
          id.push(pizza.id)
          return id
        }, [])
        .sort((a: string, b: string) => (Number(a) > Number(b) ? 1 : -1))
      console.log('ids', ids)

      for (let i = ids.length - 1; i >= 0; i--) {
        const res = await fetch(import.meta.env.VITE_API_URL + `/${ids[i]}`, {
          method: 'DELETE',
        })

        if (!res.ok) {
          throw new Error('Что-то не так. Повторите через минуту.')
        }
      }

      for (let i = 0; i < dataDefault.length; i++) {
        const res = await fetch(import.meta.env.VITE_API_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(dataDefault[i]),
        })

        if (!res.ok) {
          throw new Error('Что-то не так. Повторите через минуту.')
        }
      }
    } catch (e) {
      alert(e)
    } finally {
      dispatch(
        fetchWithParams({
          paginationState,
          searchState,
          categoryState,
          sortState,
        })
      )
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

            <Button onClick={setOpenUpdate} appearance="default">
              Обновить данные
            </Button>

            {openUpdate && <FormUpdate />}

            <Button appearance="default">Добавить данные</Button>
          </div>
        </Modal>
      )}
    </div>
  )
}
