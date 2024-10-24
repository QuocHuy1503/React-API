import { 
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="books" element={<Books />}/>
                <Route path="users" element={<Users />}/>
                <Route path="login" element={<Login />}/>
                <Route path="*" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}