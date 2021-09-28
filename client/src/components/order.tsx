import React, { CSSProperties, useState } from 'react';

interface Props {
    children?: any
    date: string
}



export default function Order(props: Props) {

    const [isOpen, setIsOpen] = useState(true)

    return (
       <div onClick={() => setIsOpen(!isOpen)} style={orderWrapper} >
            <p>{props.date}</p>
   {/*          {
                isOpen? 
                    <div>
                        {props.children}
                    </div>
                :
                null
            } */}
       </div>
          
    
    )
}

const orderWrapper: CSSProperties = {
    padding: "50px",
    backgroundColor: "black"
}
