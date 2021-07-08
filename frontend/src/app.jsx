import React, { useState, useEffect } from "react";
import axios from 'axios';
import Collection from "./components/collections";


function App() {

    return (
        <div className="FlashcardApp">
            <div className="collections">
                < Collection />
            </div>
        </div>
    )
}

export default App;