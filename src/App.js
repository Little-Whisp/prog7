import React from 'react';
import { useState } from "react";
import {Product} from "./Product";
import './style.css';

const URI_COLLECTION = "https://docent.cmi.hro.nl/bootb/demo/products"

export function App () {
  const [products, setProducts] = useState([1, 2, 3]);

  const showProducts = products.map((value, key) =>
   <Product key={value.id}product={value}/>)

  const loadJson = () => {
      fetch(URI_COLLECTION, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
          .then((response) => response.json())
          .then((result) => console.log(result))
  }
}

    useEffect(loadJson,[])

//   return (
//     <div>
//       <h1> Product List!</h1>
//       {showProducts}
//       {/*<button onClick={() => { setProducts([...products, "Charmander"]) }}>Add Product</button>*/}
//       {/* <button onClick={() => { removePokedex([...pokedex, ""]) }}>Delete Product</button> */}
//     </div>
//   );
// }
