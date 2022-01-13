import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

/**
   @SocketContext 
                lo primero es crear el context que permite emitor informacion a elementos hijos(high order component)
*/

export const SocketContext = createContext({});


/**
    @SocketProvider 
                crea el high order component que sera utilizado fuera de este archivo
                #children sera el componente que pondre dentro al utilizar el high order component
*/

export const SocketProvider = ({ children }: any) => {

    const { socket, online } = useSocket('http://localhost:8080');

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    )
}