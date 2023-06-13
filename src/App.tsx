import { useEffect, useState } from "react";
import { useGetRecipesMutation } from "./services/recipeApi";
import "./App.css";
import Card from "./components/Card";
import Spinner from "./components/Spinner";
import Modal from "./components/Modal";
import { Link, Route, Routes } from "react-router-dom";
import Favorite from "./pages/favorite";
import AppContext from "./context";
import axios from "axios";
const options = [
  {
    label: "Vegan",
    value: "vegan",
  },
  {
    label: "Vegetarian",
    value: "vegetarian",
  },
  {
    label: "Paleo",
    value: "paleo",
  },
  {
    label: "Dairy Free",
    value: "dairy-free",
  },
  {
    label: "Low Sugar",
    value: "low-sugar",
  },
  {
    label: "Egg Free",
    value: "egg-free",
  },
  {
    label: "Fish free",
    value: "fish-free",
  },
  {
    label: "Soy free",
    value: "soy-free",
  },
];
interface User {
  id: any;
  recipe: any;
}
function App() {
  const mdbreact = require("mdb-react-ui-kit");
  const { MDBRow, MDBInput, MDBBtn, MDBNavbar, MDBContainer, MDBNavbarBrand } =
    mdbreact;
  const [value, setValue] = useState("");
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState("vegan");
  const [show, setShow] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [favorites, setFavorites] = useState<User[]>([]);
  const [getRecipes, { isLoading, data }] = useGetRecipesMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const favoritesResponse = await axios.get<User[]>(
          "https://63d81aa75dbd72324433552c.mockapi.io/Items"
        );
        setFavorites(favoritesResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   axios.get<User[]>("https://63d81aa75dbd72324433552c.mockapi.io/Items");
  // });

  useEffect(() => {
    getFoodRecipes();
  }, [query, health]);

  if (isLoading) {
    return <Spinner />;
  }

  const getFoodRecipes = async () => {
    await getRecipes({ query, health });
  };

  const handleSearch = () => {
    setQuery(value);
    setValue("");
  };

  const handleClick = (e: any) => {
    setHealth(e.target.value);
  };

  const toggleShow = (recipe: any) => {
    setShow(!show);
    setRecipe(recipe);
  };

  const onAddToFavorite = async (obj: any) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://6422e958001cb9fc2033295b.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://6422e958001cb9fc2033295b.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в закладки.");
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        toggleShow,
        recipe,
        setShow,
        show,
        favorites,
        onAddToFavorite,
      }}
    >
      <div
        className="App"
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
              <h2 className="fw-bold mt-2">
                {" "}
                <Link to="/">🥩</Link> Food Recipe App{" "}
                <Link to="/favorites">❤️</Link>
              </h2>
            </MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar>
        <div className="row g-1 align-items-center mt-2">
          <MDBInput
            wrapperClass="col-auto w-75"
            label="Search recipe"
            type="text"
            value={value}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setValue(e.currentTarget.value)
            }
          />
          <div className="col-auto">
            <MDBBtn onClick={handleSearch}>Search</MDBBtn>
          </div>
          <div className="col-auto">
            <select
              className="categoryDropdown"
              onChange={handleClick}
              value={health}
            >
              {options.map((option, index) => (
                <option value={option.value || ""} key={index}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <MDBRow className="row-cols-1 row-cols-md-3">
          {data?.hits?.map((item: any) => (
            <Card toggleShow={toggleShow} recipe={item.recipe} />
          ))}
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
    </AppContext.Provider>
  );
}

export default App;
