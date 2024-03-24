import ContentLoader from 'react-content-loader'

import styles from './PizzaBlock.module.scss'

export const Skeleton = (): JSX.Element => {
  return (
    <ContentLoader
      className={styles.skeleton}
      speed={2}
      width={280}
      height={465}
      viewBox="0 0 280 466"
      backgroundColor="#e9e9e9"
      foregroundColor="#d4d4d4"
    >
      <circle cx="140" cy="125" r="122" />
      <rect x="10" y="275" rx="7" ry="7" width="260" height="20" />
      <rect x="10" y="430" rx="7" ry="7" width="80" height="25" />
      <rect x="120" y="420" rx="20" ry="20" width="150" height="40" />
      <rect x="10" y="315" rx="15" ry="15" width="260" height="85" />
    </ContentLoader>
  )
}
