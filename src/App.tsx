import Header from "./component/Header";
import {ThemeProvider} from "./component/ThemeContext";
import {BrowserRouter} from "react-router-dom"

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <div className="App">
                    <Header/>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
