import { ToastContainer } from 'react-toastify'
import WordlePage from './wordle/page/WordlePage'

function App() {

  return (
    <>
      <WordlePage />
      <ToastContainer aria-label="" />
    </>
  )
}

export default App