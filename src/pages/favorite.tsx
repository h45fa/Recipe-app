import React from "react";
import Modal from "../components/Modal";
import Card from "../components/Card";
import AppContext from "../context";
import { Link } from 'react-router-dom';

type ContextType = {  
  toggleShow: (item: any) => void;
  recipe: any;
  setShow: any;
  show: boolean;
  favorites: any;
};

const Favorite = () => {
  const mdbreact = require("mdb-react-ui-kit");
  const { MDBRow, MDBNavbar, MDBContainer, MDBNavbarBrand } =
    mdbreact;
    const {favorites,show,recipe,setShow,toggleShow} = React.useContext(AppContext) as ContextType;
    const renderFav = () => {
      favorites.map((item: any) => (
        <Card toggleShow={toggleShow} recipe={item.recipe} />
      ))
    }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBNavbar light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="text-center">
            <h2 className="fw-bold mt-2"> <Link to="/favorites">❤️</Link> Favorite <Link to="/">🥩</Link></h2>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
      <MDBRow className="row-cols-1 row-cols-md-3">
        {renderFav}
      </MDBRow>
      {show && (
        <Modal
          show={show}
          setShow={setShow}
          recipe={recipe}
          toggleShow={toggleShow}
        />
      )}
    </div>
  );
};

export default Favorite;
