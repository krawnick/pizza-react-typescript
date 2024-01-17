import styles from './NotFoundBlock.module.scss'

export const NotFoundBlock = (): JSX.Element => {
  return (
    <div className={styles.notFoundBlock}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.notFoundBlockDesc}>
        К сожалению, данной страницы не существует
      </p>
    </div>
  )
}
