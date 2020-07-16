import React from 'react';
import Characters from './component/Characters';
import { Provider } from 'react-redux';
import generateStore from './redux/store'

function App() {

    const store = generateStore();

    return (
        <Provider store={store}>
            <center>
            <h1>Rick and Morty</h1>
            </center>
            <hr/>
            <Characters />
        </Provider>
    )
}

export default App