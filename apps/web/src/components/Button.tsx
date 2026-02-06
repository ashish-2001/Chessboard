function Button({ onClick, children }){
    return (
        <div>
            <button onClick={onClick}>This is a button</button>
        </div>
    )
}

export {
    Button
}