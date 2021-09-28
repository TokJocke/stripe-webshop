import React, { CSSProperties, useState } from 'react';

interface Props {
    children?: any
    date: string
}



export default function Order(props: Props) {

    const [isOpen, setIsOpen] = useState(false)

    return (
       <div onClick={() => setIsOpen(!isOpen)} style={orderWrapper} >
            <p>{props.date}</p>
            {
                isOpen? 
                    <div style={dropDownStyle}>
                        {props.children}
                    </div>
                :
                null
            }
       </div>
          
    
    )
}

const orderWrapper: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    marginTop: "15px",
    cursor: "pointer",
}

const dropDownStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(30, 30, 30)",
    alignItems: "center",
    borderRadius: "15px",
    width: "50%",
    color: "rgb(230, 230, 230)",
    padding: "20px"

}
