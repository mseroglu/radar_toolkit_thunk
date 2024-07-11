import { useEffect, useState } from "react"
import Header from "./components/Header"
import MapView from "./pages/MapView"
import ListView from "./pages/ListView"
import { useDispatch } from "react-redux"
import { getFlights } from "./redux/actions"
import Modal from "./components/Modal"


const App = () => {
  const [isMapView, setIsMapView] = useState(true)
  const dispatch = useDispatch()

  // detayı gösterilecek uçuşun id'si
  const [detailId, setDetailId] = useState(null)


  useEffect(() => {
    dispatch(getFlights())
    
    // uçuş verisini 60 sn de bir al
    const intervalId = setInterval(() => {
      dispatch(getFlights())      
    }, 60_000);

    // componentWillUnmount (bileşen ekrandan gitme olayı)
    return () => clearInterval(intervalId)
  }, [])


  return (
    <div style={{ marginLeft: detailId ? 300 : 0 }}>
      <Header />

      <div className="view-buttons">
        <button className={isMapView ? "" : "active"} onClick={() => setIsMapView(false)}>Liste Görünümü</button>
        <button className={isMapView ? "active" : ""} onClick={() => setIsMapView(true)}>Harita Görünümü</button>
      </div>

      <div>
        {
          isMapView
            ? <MapView setDetailId={setDetailId} />
            : <ListView setDetailId={setDetailId} />
        }
      </div>

      {detailId && <Modal detailId={detailId} close={() => setDetailId(null)} />}

    </div>
  )
}

export default App
