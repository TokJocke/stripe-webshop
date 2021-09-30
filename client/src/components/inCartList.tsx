import React, { CSSProperties, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Product from './product';
import { imgStyle } from './productList';


interface Iproduct {
    name: string,
    price: string,
    info: string,
    quantity: string,
    id: string,
    img: string
}

interface Props {
    ifCart: any
}

export default function InCartList(props: Props) {

    const [cartProducts, setCartProducts] = useState<Iproduct[]>()
    const history = useHistory()

    const getCartProducts = async () => {
        const response = await fetch("http://localhost:3000/getCartProducts", {
            method: "GET",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            
        })
        let data = await response.json()
        if(response.status === 401) { //lägg ut på flera ställen
            history.push("/no-user/401")
        }
        else {
            setCartProducts(data)
        }
    }

    const changeQuantity = async (id: string, addOrRemove: string) => {
        await fetch("http://localhost:3000/changeQuantity", {
            method: "POST",
            headers: {"content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({id, addOrRemove})
            
        })
        getCartProducts()
    }

    const checkCart = () => {
        if(cartProducts && cartProducts.length) {
            props.ifCart(true)
        }
        else {
            props.ifCart(false)
        }
    }

    useEffect(() => {
        checkCart()
    }, [cartProducts])

    useEffect(() => {
        getCartProducts()
    }, [])

    return (
        <div style={productListStyle}>
            
            { 
                cartProducts && cartProducts.length?
                cartProducts.map((product, i) => {
                    return(
                        <Product key={i}> 
                            <h1>{product.name}</h1>
                            <img style={imgStyle} src={require(`../assets/${product.img}`).default} alt="product image" />
                            <p>{product.price}</p>
                            <p>{product.info}</p>
                            <div style={quantityDiv}>
                                <button className="redBtnEffect" style={{...quantityBtnStyle, backgroundColor: "rgb(244, 113, 116)"}} onClick={() => changeQuantity(product.id, "-")}>
                                    -
                                </button>
                                <p>{product.quantity}</p>
                                <button className="greenBtnEffect" style={{...quantityBtnStyle, backgroundColor: "RGB(111, 194, 118)"}} onClick={() => changeQuantity(product.id, "+")}>
                                    +
                                </button>
                            </div>
                            <button className="blueBtnEffect" style={removeBtnStyle} onClick={() => changeQuantity(product.id, "delete")}>
                                Ta bort
                            </button>
                        </Product>
                    )
                })
                :
                <p>Din kundvagn är tom</p>
            } 
        </div>
                
    );
}

const productListStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap"
}

const quantityDiv: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
}

const quantityBtnStyle: CSSProperties = {
    borderRadius: "5px",
    height: "50%",
    border: "none",
    fontSize: "1.2em",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer"
}

const removeBtnStyle: CSSProperties = {
    borderRadius: "5px",
    width: "100%",
    fontSize: "1.2em",
    border: "none",
    backgroundColor: "rgb(85, 150, 245)",
    color: "white",
    cursor: "pointer",
    padding: "5px"

}