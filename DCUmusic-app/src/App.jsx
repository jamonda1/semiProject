import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/users/Signup';
import Signin from './components/users/Signin';
import Home from './components/Home';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
