import * as React from 'react';
import Home from "../../pages/Home";
import StateHook from "../../hooks/StateHook";
import ContextHook from "../../hooks/ContextHook";



const routes = [
    {
        path: "/",
        id: "Home",
        element: <Home />,
    },
    {
        path:"/hooks",
        id:"hooks",
        children:[
            {
                index:true,
                path:"/hooks/useState",
                id:"useState",
                element:<StateHook />
            },
            {
                path:"/hooks/useContext",
                id:"useContext",
                element:<ContextHook />
            },
        ]
    },
]

export default routes;
