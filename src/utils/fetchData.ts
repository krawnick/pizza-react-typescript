export const fetchData = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetch(url, options)
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
