import React from 'react'

interface PropsFunction {
  toggleShow: (item:any) => void;
  recipe: any;
}

const Card: React.FC<PropsFunction> = ({recipe,toggleShow}) => {
  const mdbreact = require("mdb-react-ui-kit");
  const { MDBCol, MDBCardGroup, MDBCard, MDBCardImage, MDBCardBody } = mdbreact;
  return (
    <>
    <MDBCol>
      <MDBCardGroup>
        <MDBCard className="h-100 mt-2 d-sm-flex">
          <MDBCardImage
          src={recipe.image}
          alt={recipe.label}
          position="top"
          style={{cursor: "pointer"}}
          onClick={() => toggleShow(recipe)}
          />
          <MDBCardBody>
            <h2 className="fw-bold">{recipe.label}</h2>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </MDBCol>
    </>
  )
}

export default Card