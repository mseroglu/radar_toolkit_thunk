import { useSelector } from "react-redux"


const Header = () => {
    const { isLoading, error, flights } = useSelector(store => store.flightReducer)


    return (
        <header >
            <div >
                <img src="/plane-logo.png" alt="logo" />
                <h3>Uçuş Radarı</h3>
            </div>

            <p className="error">
                {isLoading 
                ? "Yükleniyor.." 
                : error 
                ? "Hata: " + error 
                : flights.length + " Uçuş Bulundu"}
            </p>

        </header>
    )
}

export default Header
