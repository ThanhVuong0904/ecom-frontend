import { BrowserRouter as Router} from "react-router-dom";
import Routes from "./routes/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthContextProvider from "./contexts/authContext";
import ProductContextProvider from "./contexts/productContext";
function App() {
    return (
        <AuthContextProvider>
            <ProductContextProvider>
                <Router>
                    <Header />
                    <div className="container">
                        <div className="main">
                            <Routes />
                        </div>
                    </div>
                    <Footer />
                </Router>
            </ProductContextProvider>
        </AuthContextProvider>
    );
}

export default App;
