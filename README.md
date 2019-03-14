#use-function

React hook to deal with async functions

## Usage example:

```jsx harmony
import React, {useState} from "react";
import axios from "axios";

// import hook
import {useFunction} from "use-function";

import "./App.css";

export default function App() {
    const [query, setQuery] = useState("redux");

    const url = `https://hn.algolia.com/api/v1/search?query=${query}`;

    // call hook with needed function, arguments and default result
    const call = useFunction(
        axios.get,              // function 
        [url],                  // arguments list
        {data: {hits: []}}      // default result
    );

    return (
        <div className="App">
            <header className="App-header">
                <p>Hello, this is react-playground</p>

                <input value={query} onChange={e => setQuery(e.target.value)}/>

                <button onClick={call.recall} disabled={call.incall}>Reload</button>

                {call.error && <b className="error">{String(call.error)}</b>}
                {call.incall && <b className="info">Loading...</b>}

                <ul>
                    {call.result.data.hits
                        .filter(hit => !!hit.url)
                        .map(hit => (
                            <li key={hit.url}>
                                <a href={hit.url}>{hit.title}</a>
                            </li>
                        ))}
                </ul>
            </header>
        </div>
    );
}
```
