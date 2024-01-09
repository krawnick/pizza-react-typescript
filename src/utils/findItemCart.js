export const findItem = (state, payload) => {
  return state.itemsState.find((obj) => {
    return (
      obj.id === payload.id &&
      obj.size === payload.size &&
      obj.type === payload.type
    )
  })
}
