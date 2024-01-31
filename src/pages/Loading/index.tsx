import { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'

import { FullPizza } from '../FullPizza'

export async function loadPizza({ params }) {
  try {
    const piz = await fetch(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/${params.id}`
    ).then((res) => res.json())
    if (piz === 'Not found') throw Error
    return defer({ piz })
  } catch (error) {
    alert(error)
    return null
  }
}

export const Loading = (): JSX.Element => {
  const { piz } = useLoaderData()
  console.log('piz', piz)
  return (
    <Suspense fallback={<div>ASPFOKKAPSFJASJFAJF</div>}>
      <Await errorElement={<div>zopkdfsp</div>} resolve={piz}>
        {(data) => <FullPizza pizza={data} />}
      </Await>
    </Suspense>
  )
}
