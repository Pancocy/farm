import * as React from 'react';
import {Menu,Breadcrumb} from "antd";
import { RouterProvider, useNavigation} from "react-router-dom";
import routes from "./router/routes/routes";
import router from "./router";
import {useState} from "react";
//格式化路由
const formatterRoutes = (routes: any[])=>{
    return routes.map(route =>{
        return {
            key:route.id,
            label:route.id,
            children:route.children && route.children.length > 0 ? formatterRoutes(route.children) : null
        }
    })
}
//查找当前路由
const findExactRoute =(routes: any,obj:any)=>{
        routes.find((route: { id: any; children: string | any[]; })=>{
            if(route.id === obj.key){
                obj.route = route;
                return true;
            }else if(route.children && route.children.length > 0){
                findExactRoute(route.children,obj);
            }
        })
    return obj;
}
//格式化面包屑
const intialBreadcrumb = (pathArray: any,result:any)=>{
    // result = pathArray.reverse().map((item:any,index: number)=>{
    //         if(index === 0){
    //             return {title:item}
    //         }else{
    //             return { title: <a href={`/${pathArray.reverse()[1]}/${item}`}>{item}</a> }
    //         }
    // })
    result = pathArray.reverse().map((item:any,index: number)=>{
        return {title:item}
    })
    return result;
}

const App = () => {
    const [breadcrumb,setBreadcrumb] = useState([{title:'Home'}]);
    const onClick = (e:any)=>{
        const currentRoute = intialBreadcrumb(e.keyPath,[]);
        setBreadcrumb(currentRoute);
        const targetRoute = findExactRoute(routes,e);
        console.log(targetRoute);
    };
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <Menu
                        onClick={(e)=>{onClick(e)}}
                        style={{
                            width: 256,
                        }}
                        defaultSelectedKeys={['Home']}
                        mode="inline"
                        items={formatterRoutes(routes)}
                    />
                </nav>
            </div>
            <div id="detail">
                <Breadcrumb items={breadcrumb}></Breadcrumb>
                <RouterProvider router={router}></RouterProvider>
            </div>
        </>
    );
};

export default App;
