import { RootState } from '../../store'

export const selectorAllData = (state: RootState) => state.admin.items
export const selectorAdminStatus = (state: RootState) => state.admin.status
