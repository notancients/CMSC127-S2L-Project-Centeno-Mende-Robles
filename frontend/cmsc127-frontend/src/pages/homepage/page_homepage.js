


let first_name = sessionStorage.getItem("first_name")

function HomePage() {

    
    return (
        <div className="container">
            Welcome {first_name}
        </div>
    )
}

export default HomePage;