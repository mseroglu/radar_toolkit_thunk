import axios from "axios"
import { useEffect, useState } from "react"
import { headers } from "../utils/constants"
import formatTime from "../utils/formatDate"
import Loader from "../components/Loader"
import { useDispatch } from "react-redux"
import { setPath } from "../redux/slices/flightSlice"


const Modal = ({ detailId, close }) => {
  // sadece burda kullanılacak veriyi store da tutmaya gerek yoktur
  const [detail, setDetail] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // eski verileri silelim ki loader gösterilsin
    setDetail(null);

    const params = { flight: detailId };

    axios.get('https://flight-radar1.p.rapidapi.com/flights/detail', { params, headers })
      .then((res) => {        
        setDetail(res.data);
        dispatch(setPath(res.data.trail))
      })
      .catch((err) => console.log(err))
  }, [detailId])


  return (
    <div className="modal-outer">
      <div className="modal-inner">
        <div className="close-wrapper">
          <button onClick={close}>X</button>
        </div>

        {!detail ? <Loader /> : (
          <>
            <h3>{detail.aircraft?.model?.text}</h3>
            <h4>{detail.aircraft?.model?.code}</h4>

            <p >
              <span>Kuyruk Kodu</span>
              <span>{detail.aircraft?.registration}</span>
            </p>

            {detail.aircraft?.images ? <img src={
              detail.aircraft?.images?.large
                ? detail.aircraft?.images?.large[0]?.src
                : detail.aircraft?.images?.medium
                  ? detail.aircraft?.images?.medium[0].src
                  : detail.aircraft?.images?.thumbnails[0]?.src
            } /> : <p>Fotoğraf Bulunamadı</p>}

            <p >
              <span>Şirket</span>
              <span>{detail.airline?.short}</span>
            </p>

            <p >
              <span>Kalkış</span>
              <a href={detail.airport?.origin?.website} target="_blank"> {detail.airport?.origin?.name}</a>
            </p>

            <p >
              <span>İniş</span>
              <a href={detail.airport?.destination?.website} target="_blank"> {detail.airport?.destination?.name}</a>
            </p>

            <p >
              <span>Kalkış Zamanı</span>
              <span>{detail.time?.scheduled?.departure ? formatTime(detail.time?.scheduled?.departure) : "Bilinmiyor"}</span>
            </p>

            <p >
              <span>İniş Zamanı</span>
              <span>{detail.time?.scheduled?.arrival ? formatTime(detail.time?.scheduled?.arrival) : "Bilinmiyor"}</span>
            </p>

            <p className={detail.status?.icon} >
              <span>{detail.status?.text}</span>
            </p>

          </>
        )
        }

      </div>
    </div>
  )
}

export default Modal
