import { useState} from "react";
import { useNavigate } from "react-router-dom";

const TellMePanel = () => {

  let [inputValue, setInputValue] = useState("");
  let navigate = useNavigate();
  
  function handleOnClick() {
    navigate("/weather?location=" + inputValue);
  }

  let handleChange = function (e) {
    setInputValue(e.target.value);
  };

    return (
        <div className="tell-me d-flex justify-content-center align-items-center">
          <form className="location-input d-block" role="search" >
            <h2 className="mb-3">Tell me about...</h2>
            <input
              className="form-control me-2 "
              onChange={handleChange}
              type="search"
              placeholder="Location name..."
              aria-label="Search"
              name="location"
            />
            <div className="text-center">
              <button className="location-search-btn btn btn-outline-primary mt-3" onClick={handleOnClick} type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
    );
};

export default TellMePanel;