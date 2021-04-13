function transalte_error(status: Number) {
    let element = null;
    switch (status) {
        case 0: return element;
        case 409: element = "This email already has an account connected to it!"; break;
        case 500: element = "Internal server error"; break;
        case -1: element = "Network Error. Our database seems to be down. If this issue persists, please report this to our team!"; break;
        default: element = "Daaah... Something went wrong and we don't know what :(\n error code: " + status; break;
    }
    return(<div>{element}</div>)
}

const ResponseError = (props: { status: Number }) => {
    console.log(`RESPONSE ERROR - STATUS: ${props.status}`)
    return(transalte_error(props.status));
}

export default ResponseError;