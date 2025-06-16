const   getHeaderToken = () => {
    const cookie = document.cookie.split("=")[1] || "No cookie";
    return {
        headers: {
            Mesh: cookie,
        },
    };
};


export default getHeaderToken