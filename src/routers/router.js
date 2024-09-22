import { useRoutes } from "react-router-dom";
import Home from "../pages/home"
import Create from "../pages/create";
import Detail from "../pages/detail";

export const Router = () => {
    let element = [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/create',
            element: <Create/>
        },
        {
            path: 'detail/:id',
            element: <Detail/>
        }
    ];

    let router = useRoutes(element);
    return router;
}