
export const getUltimos = async () => {
    console.log(" data.latest")
    const response = await fetch('http://localhost:8080/latest');
    const data = await response.json();
    console.log(" data.latest", data)
    return data.latest;
}