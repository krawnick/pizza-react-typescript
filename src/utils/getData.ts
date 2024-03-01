export const getData = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(response.status + ': ' + response.statusText.toString())
    }

    return data
  } catch (e) {
    console.log(e)
    return false
  }
}
