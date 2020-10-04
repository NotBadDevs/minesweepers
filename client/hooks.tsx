import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

export const useStore = (): any => useContext(MobXProviderContext)
