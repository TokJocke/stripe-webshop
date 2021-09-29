import React, { CSSProperties, useEffect, useRef, useState } from 'react';

interface Props {
    children: any
    btnText: string
}

export default function NavMenu(props: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    
    const handleClick = (event: any) => {
        if(menuRef && !menuRef.current?.contains(event.target as Node))  { 
            setIsOpen(false)
            console.log("utanför, false")
        } 
    }   

    useEffect(() => {
        document.body.addEventListener("click", (event) => handleClick(event))
    }, [])

    useEffect(() => { /* Just for logging click on body */
        console.log("isOpen state: ", isOpen)
    }, [isOpen])

    return (
        <div ref={menuRef}  className="navMenu" style={navMenu}>
            <button className="blueBtnEffect" style={menuBtn} onClick={() => setIsOpen(!isOpen)}>
                {props.btnText}
            </button>
            {
                isOpen?
                    <div className="navDropDown" style={navDropDown}>
                        {props.children} 
                    </div>        
                    :
                    null
            }
        </div>
    );
}

const navMenu: CSSProperties = {
    width: "15%",
    display: "flex",
    justifyContent: "flex-end"
}

const navDropDown: CSSProperties = {
    /*     position: "absolute",
    right: "10%" */
   // height: "80vh",
    width: "15%",
    top: "20%",
    position: "absolute",
    backgroundColor: "rgb(33, 33, 33)",
    padding: "10px",
    borderBottomLeftRadius: "15px"
}

const menuBtn: CSSProperties = {
    width: "100%",
    alignSelf: "flex-end",
    padding: "5px",
    backgroundColor: "rgb(85, 150, 245)",
    border: "none",
    color: "white",
    fontSize: "1.8em",
    cursor: "pointer",
    borderTopLeftRadius: "10px"
}