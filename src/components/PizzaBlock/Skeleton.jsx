import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#919191"
    foregroundColor="#737373"
    {...props}
  >
    <circle cx="140" cy="140" r="130" />
    <rect x="10" y="300" rx="7" ry="7" width="260" height="20" />
    <rect x="10" y="430" rx="7" ry="7" width="80" height="25" />
    <rect x="120" y="420" rx="10" ry="10" width="150" height="35" />
    <rect x="10" y="340" rx="9" ry="9" width="260" height="65" />
  </ContentLoader>
)
