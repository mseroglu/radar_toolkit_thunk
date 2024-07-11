import { useDispatch, useSelector } from "react-redux"
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { icon } from "leaflet"
import { setPath } from "../redux/slices/flightSlice"
import { useState } from "react"


const MapView = ({ setDetailId }) => {
    const { flights, path } = useSelector((store) => store.flightReducer)
    const [isHidden, setIsHidden] = useState(true)
    const dispatch = useDispatch()

    const planeIcon = icon({
        iconUrl: "plane-icon1.png",
        iconSize: [25, 25]
    })


    return (
        <div>
            <MapContainer
                center={[38.505, 36.09]}
                zoom={6}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {flights.map(flight => (
                    <Marker icon={planeIcon} key={flight.id} position={[flight.lat, flight.lng]}>
                        <Popup >
                            <div className="d-flex flex-column gap-2">
                                <span>Kod: {flight.code}</span>
                                <button onClick={() => {
                                    setDetailId(flight.id);
                                    setIsHidden(false);
                                    }} className="btn btn-success">Detay</button>
                                <button onClick={()=> {
                                    dispatch(setPath([]));
                                    setIsHidden(true)
                                    }}  className={`btn btn-warning ${isHidden&&"d-none"}`} >Rotayı Temizle</button>

                            </div>
                        </Popup>
                    </Marker>
                ))}

                <Polyline positions={path} />
            </MapContainer>
        </div>
    )
}

export default MapView
