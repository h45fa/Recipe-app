import React from "react";
import AppContext from "../context";

interface PropsFunction {
  toggleShow: (item: any) => void;
  recipe: any;
  setShow: any;
  show: boolean;
}

type ContextType = {  
  onAddToFavorite: (item: any) => void;
};

const Modal: React.FC<PropsFunction> = ({
  toggleShow,
  recipe,
  setShow,
  show,
}) => {
  const mdbreact = require("mdb-react-ui-kit");
  const {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBBtn,
    MDBModalBody,
    MDBModalFooter,
    MDBListGroup,
    MDBListGroupItem,
  } = mdbreact;
  const {onAddToFavorite} = React.useContext(AppContext) as ContextType;
  return (
    <>
      <MDBModal show={show} setShow={setShow}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <h5 className="fw-bold">{recipe.label}</h5>
              <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
            </MDBModalHeader>
            <MDBModalBody>
              <img src={recipe.image} alt={recipe.label} />
              <div className="mt-2">
                <h5
                  className="text-start fw-bold text-muted"
                >
                  Calories:
                </h5>
                <h2 className="text-start">{recipe.calories.toFixed(2)} Kcal</h2>
                <h5 className="text-start fw-bold text-muted">Ingredients:</h5>
                <MDBListGroup style={{ minWidth: '22rem' }} light>
                  {recipe.ingredientLines.map((item: any) => (
                    <MDBListGroupItem noBorders>{item}</MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() =>console.log(recipe)}>❤️</MDBBtn>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default Modal;
