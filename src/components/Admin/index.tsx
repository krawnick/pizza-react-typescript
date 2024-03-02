import cn from 'classnames'
import { useEffect, useState } from 'react'

import { Button } from '..'
import { data as dataDefault } from '../../assets/defaultData.ts'
import { useToggle } from '../../hooks/useToggle.ts'
import { selectorFilter } from '../../redux/slices/filter/selectors.ts'
import { IPizzas } from '../../redux/slices/pizzas/types.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store.ts'
import { fetchWithParams } from '../../utils/fetchWithParams.ts'
import { getData } from '../../utils/getData.ts'
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

  const [modalActive, setModalActive] = useState(false)
  const [openUpdate, setOpenUpdate] = useToggle()
  const [data, setData] = useState()
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    if (modalActive === true) {
      const loadData = async () => {
        setData(await getData())
      }
      loadData()
    }
  }, [modalActive])

  const resetData = async () => {
    setIsReset(true)

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

      alert('Данные успешно обновлены')
    } catch (e) {
      alert(e)
    } finally {
      setIsReset(false)
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
            {data ? (
              <>
                <Button
                  disabled={isReset}
                  onClick={resetData}
                  appearance="default"
                >
                  Сбросить данные
                </Button>

                {isReset && <div>Идет обновление данных...</div>}

                <Button onClick={setOpenUpdate} appearance="default">
                  Обновить данные
                </Button>

                {openUpdate && (
                  <FormUpdate data={data} setOpen={setOpenUpdate} />
                )}

                <Button appearance="default">Добавить данные</Button>
              </>
            ) : (
              <div>Идет загрузка...</div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
