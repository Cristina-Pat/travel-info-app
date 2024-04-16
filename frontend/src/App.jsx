import { BrowserRouter } from "react-router-dom";
import AppMain from "./AppMain";

const App = () => {
    return (
        <BrowserRouter>
            <AppMain initialFavourites={[]}></AppMain>
        </BrowserRouter>
    );
};

export default App;
