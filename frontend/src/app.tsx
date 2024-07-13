import "./App.css"

import { BrowserRouter } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { MainPage } from "./pages/mainPage"
import React from "react"
import { RegisterPage } from "./pages/registerPage"

export default function App() {
    return (
        <BrowserRouter>
            <meta name="color-scheme" content="light only"></meta>
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/login" element={<RegisterPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
