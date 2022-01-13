
export const getUserStorage = () => {
    return {
        agent: localStorage.getItem('agent') || null,
        desck: localStorage.getItem('desck') || null,
    }
}