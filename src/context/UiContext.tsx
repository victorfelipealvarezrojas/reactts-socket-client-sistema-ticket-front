import { createContext, useState } from "react"

export const UiContext = createContext({});

export const UiProvider = ({ children }: any) => {

    const [hideMenu, setHideMenu] = useState<Boolean>(false);//false es visible

    const show = () => {
        setHideMenu(false);
    }

    const hide = () => {
        setHideMenu(true);
    }

    return (
        <UiContext.Provider value={{
            hideMenu,
            show,
            hide
        }}>
            {children}
        </UiContext.Provider>

    )
}

