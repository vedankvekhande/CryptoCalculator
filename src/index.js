import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import CurrencyConverter from './CryptoConverter/CurrencyConverter';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    {/* <MovieApp/> */}
    <CurrencyConverter/>
    </>
    // <BrowserRouter>
    // <Navbar/>
    // <Routes>
    // <Route path='/' element={<Shop/>} ></Route>
    // <Route path='/mens' element={<ShopCategory category='men'/>}></Route>
    // <Route path='/womens' element={<ShopCategory category='women'/>} ></Route>
    // <Route path='/kids' element={<ShopCategory category='kids'/>} ></Route>
    // <Route path='/product' element={<Product />} >
    //     <Route path=':productId' element={<Product/>}> </Route>
    // </Route>
    // <Route path='/cart' element={<Cart />} ></Route>
    // </Routes>
    // </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
