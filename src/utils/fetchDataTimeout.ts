export const fetchDataTimeout = () => {
  return new Promise((resolve, reject) => {
    const time = setTimeout(() => {
      try {
        const fetchData = async () => {
          const res = await fetch(import.meta.env.VITE_API_URL + '123')
          if (!res.ok) {
            clearTimeout(time)
            reject()
            throw new Error('ERROR')
          }
          return res.json()
        }
        resolve(fetchData())
      } catch (error) {
        alert(error)
        clearTimeout(time)
        reject()
      }
    }, 3000)
  })
}
