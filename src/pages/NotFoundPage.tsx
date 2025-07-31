import { Link } from "react-router";

function NotFoundPage(){
    return(
        <div>
            <h1>Pagina no encontrada</h1>
            <Link to={"/"}>
                <button>Regresar al inicio</button>
            </Link>
        </div>
    )
}

export default NotFoundPage;