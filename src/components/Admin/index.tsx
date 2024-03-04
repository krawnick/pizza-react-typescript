import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'

import { Button } from '..'
import { data as dataDefault } from '../../assets/defaultData.ts'
import { useToggle } from '../../hooks/useToggle.ts'
import { selectorFilter } from '../../redux/slices/filter/selectors.ts'
import { IPizzas } from '../../redux/slices/pizzas/types.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store.ts'
import { fetchWithParams } from '../../utils/fetchWithParams.ts'
import { getData } from '../../utils/getData.ts'
import { FormAdd } from '../FormAdd/index.tsx'
import { FormUpdate } from '../FormUpdate/index.tsx'
import { Modal } from '../Modal'
import { ProgressBar } from '../ProgressBar/index.tsx'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const { paginationState, searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  const [modalActive, setModalActive] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [progress, setProress] = useState(0)
  const [data, setData] = useState()
  const currentProgress = useRef(0)
  const [openUpdate, setOpenUpdate] = useToggle()
  const [openAdd, setOpenAdd] = useToggle()

  useEffect(() => {
    if (modalActive === true) {
      const loadData = async () => {
        setData(await getData())
      }
      loadData()
    }
  }, [modalActive, openUpdate])

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

      for (let i = ids.length - 1; i >= 0; i--) {
        const res = await fetch(import.meta.env.VITE_API_URL + `/${ids[i]}`, {
          method: 'DELETE',
        })

        if (!res.ok) {
          throw new Error('Что-то не так. Повторите через минуту.')
        }
        currentProgress.current = currentProgress.current + 50 / data.length
        setProress(currentProgress.current)
        await new Promise((res) => setTimeout(res, 400))
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

        currentProgress.current =
          currentProgress.current + 50 / dataDefault.length
        setProress(currentProgress.current)
        await new Promise((res) => setTimeout(res, 400))
      }

      alert('Данные успешно обновлены')
    } catch (e) {
      alert(e)
    } finally {
      currentProgress.current = 0
      setProress(0)
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

                {isReset && (
                  <div>
                    Идет обновление данных...
                    <ProgressBar progress={progress} />
                  </div>
                )}

                <Button onClick={setOpenUpdate} appearance="default">
                  Обновить данные
                </Button>

                {openUpdate && (
                  <FormUpdate data={data} setOpen={setOpenUpdate} />
                )}

                <Button onClick={setOpenAdd} appearance="default">
                  Добавить данные
                </Button>

                {openAdd && <FormAdd setOpen={setOpenAdd} />}
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
