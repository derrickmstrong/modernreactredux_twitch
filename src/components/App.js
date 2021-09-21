import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
const PageOne = () => {
    return <div>Page 1</div>
}
const PageTwo = () => {
    return <div>Page 2
        <button>Click Me</button>
    </div>
}
const App = () => {
    return (
        <div className='ui container'>
            <h1>Streams</h1>
            <Router>
                <Route path='/' exact component={PageOne} />
                <Route path='/pagetwo' exact component={PageTwo} />
            </Router>
        </div>
    )
}

export default App
