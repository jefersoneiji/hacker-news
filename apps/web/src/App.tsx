import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <p>data.id is: deleted</p>
      <p>data.value is: also deleted from api</p>
      <Link to="/about">Go to About</Link>
    </>
  )
}

export default App
