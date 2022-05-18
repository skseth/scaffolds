import './styles.css'
import IMAGE from './React-icon.png'
import LOGO from './React-icon.svg'
import { ClickCounter } from './ClickCounter'

export const App = () => {
  return (
    <>
      <h1>
        Edited Hello React typescript webpack template - {process.env.NODE_ENV}{' '}
        {process.env.name}
      </h1>
      <img src={IMAGE} alt="react logo" width="100" height="200" />
      <img src={LOGO} alt="react logo" width="100" height="200" />
      <ClickCounter />
    </>
  )
}
