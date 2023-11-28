const Header = ({user}) => {
    return (
        <header className="header-container">
            <h1 id="name"> My diary</h1>
            <h2 id="welcome">Seja bem vindo, {user}</h2>
        </header>
    )
}

export default Header