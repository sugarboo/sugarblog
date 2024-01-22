import { ToggleTheme } from './toggle-theme'

const NavigationBar = () => {
  return (
    <div className='relative h-10 mx-2 my-2 md:mx-8 md:my-4'>
      <div className='absolute top-0 right-0'>
        <ToggleTheme />
      </div>
    </div>
  )
}
 
export default NavigationBar
