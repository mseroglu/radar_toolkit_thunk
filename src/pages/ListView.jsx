import { useSelector } from "react-redux"
import ReactPaginate from "react-paginate"
import { useState } from "react"


const ListView = ({ setDetailId }) => {
  const { flights } = useSelector(store => store.flightReducer)

  const itemsPerPage = 10
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = flights.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(flights.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % flights.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
      <table className="table table-dark table-stripped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((flight, i) => (
              <tr key={flight.id}>
                <td>{i + 1}</td>
                <td>{flight.id}</td>
                <td>{flight.code}</td>
                <td>{flight.lat}</td>
                <td>{flight.lng}</td>
                <td>
                  <button onClick={()=> setDetailId(flight.id)} className="btn btn-info btn-sm">Detay</button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>

      <ReactPaginate
        breakLabel="..."
        nexLabel="Sonraki >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Önceki"
        renderOnZeroPageCount={null}
        containerClassName="pagination justify-content-center mt-5"
        pageClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-item"
        pageLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        breakLinkClassName="page-link"
        activeClassName="active"

      />
    </div>
  )
}

export default ListView
