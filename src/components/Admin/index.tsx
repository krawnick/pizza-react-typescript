import cn from 'classnames'
import { useEffect, useState } from 'react'

import { Button, Form, Modal } from '..'
import data from '../../assets/defaultData.json'
import { useToggle } from '../../hooks/useToggle.ts'
import {
  selectorAdminStatus,
  selectorAllData,
} from '../../redux/slices/admin/selectors.ts'
import {
  addItems,
  deleteItems,
  getAllData,
} from '../../redux/slices/admin/slice.ts'
import { useAppDispatch, useAppSelector } from '../../redux/store.ts'

import styles from './Admin.module.scss'

interface IAdminProps {
  className: string
}

export const Admin = ({ className }: IAdminProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectorAllData)
  const isLoading =
    useAppSelector(selectorAdminStatus) === 'loading' ? true : false

  const [showAdd, setShowAdd, closeAdd] = useToggle()
  const [showUpdate, setShowUpdate, closeUpdate] = useToggle()
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    if (modalActive === true) {
      dispatch(getAllData())
    }
  }, [modalActive])

  useEffect(() => {
    if (isLoading) {
      closeAdd()
      closeUpdate()
    }
  }, [isLoading])

  const resetData = () => {
    dispatch(deleteItems(items.map((item) => +item.id))).then(() => {
      dispatch(addItems(data))
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
              <Button
                disabled={isLoading}
                onClick={resetData}
                appearance="default"
              >
                Сбросить данные
              </Button>
              <Button onClick={setShowUpdate} appearance="default">
                Обновить данные
              </Button>
              {showUpdate && (
                <Form edit items={items} setShow={setShowUpdate} />
              )}
              <Button onClick={setShowAdd} appearance="default">
                Добавить данные
              </Button>
              {showAdd && <Form setShow={setShowAdd} />}
            </>
          </div>
        </Modal>
      )}
    </div>
  )
}
