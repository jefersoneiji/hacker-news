import './App.css'
import { graphql } from 'relay-runtime'
import { useLazyLoadQuery } from 'react-relay'

import { AppQuery as AppQueryType } from './__generated__/AppQuery.graphql'

const AppQuery = graphql`
  query AppQuery{
    ok {
      value
      id
    }
  }
`
function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {})

  return (
    <>
      <p>data.id is: {data.ok.id}</p>
      <p>data.value is: {data.ok.value.toString()}</p>
    </>
  )
}

export default App
