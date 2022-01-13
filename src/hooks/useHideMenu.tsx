import { useContext, useEffect } from "react"
import { UiContext } from "../context/UiContext"

export const useHideMenu = (hideProps: boolean) => {

    const { hide, show } = useContext<any>(UiContext)

    useEffect(() => hideProps ? hide() : show(), [hideProps, hide, show]);

}
