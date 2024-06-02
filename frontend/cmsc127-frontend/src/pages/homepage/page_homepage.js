import HomePageAppBar from "./homepage_appbar";



let first_name = sessionStorage.getItem("first_name")

function HomePage() {

    
    return (
    <>
    <HomePageAppBar/>
    <div className="container">
    </div>
    </>
    )
}

export default HomePage;