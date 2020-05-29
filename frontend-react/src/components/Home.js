import React from "react";
import "../index.css";

// Michelle React 3 may put something in here

const Home = () => {

    const welcomeStyleObj = {
        fontSize: 104,
        color: "#cc9900",
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: "monospace",
        wordSpacing: 2.2,
        color: '#000000',
        fontWeight: "normal",
        textDecoration: "none",
        fontStyle: "normal",
        fontVariant: "smallCaps",
        textTransform: "none"

    }
    
    const papyrusObj = {
        fontSize: 100,
        color: "#cc9900",
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: "papyrus",
        wordSpacing: 2.2,
        color: '#000000',
        fontWeight: 100,
        textDecoration: "none",
        fontStyle: "normal",
        textTransform: "none"
    }

    const brushObj = {
        fontSize: 104,
        color: "#cc9900",
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: "Brush Script MT",
        wordSpacing: 2.2,
        color: '#000000',
        fontWeight: 100,
        textDecoration: "none",
        fontStyle: "normal",
        textTransform: "none"
    }

    const appObj = {
        fontSize: 70,
        color: "#cc9900",
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: "Impact",
        wordSpacing: 2.2,
        color: '#000000',
        fontWeight: "30",
        textDecoration: "none",
        fontStyle: "normal",
        textTransform: "none"
    }

        return (
            <div>
                <h1><span style={welcomeStyleObj}>Welcome</span>
                    <br /> 
                    <span style={brushObj}>to the </span> 
                    <br />
                    <span style={papyrusObj}>Water My Plants</span> 
                    <br />
                    <span style={appObj}>App!</span></h1>
            </div>
        );
};

export default Home;