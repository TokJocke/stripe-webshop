import React, { CSSProperties } from 'react';
import Footer from './footer';
import Header from './header';
import ContentView from './main';




export default function Layout() {




    return (
        <div className={"siteWrap"} style={siteWrap}>
            <Header />
            <ContentView />  
            <Footer />
        </div>
        );
}

const siteWrap: CSSProperties = {
    width: "100vw",
    height: "100vh",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column"
}