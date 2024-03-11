import cn from 'classnames'
import { useEffect, useState } from 'react'

import { Button } from '..'
import { data as defaultData } from '../../assets/defaultData.ts'
import { useToggle } from '../../hooks/useToggle.ts'
import { selectorAllData } from '../../redux/slices/admin/selectors.ts'
import {
  addItems,
  deleteItems,
  getAllData,
} from '../../redux/slices/admin/slice.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store.ts'
import { FormAdd } from '../FormAdd/index.tsx'
import { FormUpdate } from '../FormUpdate/index.tsx'
import { Modal } from '../Modal'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectorAllData)

  const [openAdd, setOpenAdd] = useToggle()
  const [openUpdate, setOpenUpdate] = useToggle()
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    if (modalActive === true) {
      dispatch(getAllData())
    }
  }, [modalActive, openUpdate])

  const resetData = () => {
    dispatch(deleteItems(items.map((item) => +item.id))).then((res) => {
      console.log('res', res)
      dispatch(addItems(defaultData))
    })
  }

  return (
    <div className={cn(className, styles.admin)}>
      <Button
        className={styles.adminOpen}
        appearance="back"
        onClick={() => setModalActive(true)}
      >
        ADMIN
      </Button>
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          <div className={styles.adminBody}>
            <>
              <Button disabled={false} onClick={resetData} appearance="default">
                Сбросить данные
              </Button>
              <Button onClick={setOpenUpdate} appearance="default">
                Обновить данные
              </Button>
              {openUpdate && (
                <FormUpdate data={items} setOpen={setOpenUpdate} />
              )}
              <Button onClick={setOpenAdd} appearance="default">
                Добавить данные
              </Button>
              {openAdd && <FormAdd setOpen={setOpenAdd} />}
            </>
          </div>
        </Modal>
      )}
    </div>
  )
}
