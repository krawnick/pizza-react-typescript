export const getData = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL)

    if (!res.ok) {
      throw new Error(res.status + ': ' + res.statusText.toString())
    }

    return res.json()
  } catch (e) {
    console.log(e)
    return false
  }
}
