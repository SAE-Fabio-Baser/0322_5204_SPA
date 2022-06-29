import React, { useState } from "react"

function Counter() {

    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <div>
            <span>{count}</span>
            <button onClick={handleClick}>+1</button>
        </div>
    )
}

export default Counter