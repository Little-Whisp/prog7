import React from 'react';
import './style.css';
import { useState } from 'react';


export function Product(props) {
    console.log(props);

    const deleteProduct = () =>{

    }


    return <section>
        <h2>{props.product.title}</h2>
        <button onClick={deleteProduct}>Delete</button>
    </section>;

}