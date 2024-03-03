import styles from './progressBar.module.scss'

export const ProgressBar = ({ progress }: { progress: number }) => {
  // console.log('progress', progress)
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressBarStatus}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
