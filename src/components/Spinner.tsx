const Spinner = () => {
  const mdbreact = require("mdb-react-ui-kit");
  const { MDBSpinner } = mdbreact;
  return (
    <div className="text-center mt-5">
      <MDBSpinner className="mt-2" style={{width: "3rem", height: "3rem"}}>
        <span className="visually-hidden">
          Loading...
        </span>
      </MDBSpinner>
    </div>
  )
}

export default Spinner