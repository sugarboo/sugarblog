'use client'

import { AppProgressBar } from 'next-nprogress-bar'

const ProgressBar = () => {
  return (
    <AppProgressBar
      height="2px"
      color="#a3a3a3"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}
 
export default ProgressBar
