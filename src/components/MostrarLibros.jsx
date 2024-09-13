import { useState, useEffect } from "react"; // Hooks de React
import { db } from "../firebase/config"; // App de Firebase
import { collection, getDocs } from "firebase/firestore"; // Funciones de Firestore
import { Link } from "react-router-dom"; // Libreria de rutas con react

const MostrarLibros = () => {

    const [libros, setLibros] = useState([]); // Variable de estado para almacenar los libros
    const  librosCollection = collection(db, "books"); // Colección de libros en Firestore

    useEffect(() => {
        getDocs(librosCollection).then((e)=>{
            setLibros(e.docs.map((doc)=>{
                return{...doc.data(), id: doc.id}
            }));
        });
    }, []);

    return (
        <div className="container p-2">
           <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        libros &&
                        libros.map((libro, index)=>{
                            return(
                                <tr key={libro.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{libro.name}</td>
                                    <td>{libro.description}</td>
                                    <td><img src={libro.img} alt="" style={{width:"40px"}} /></td>
                                    <td>
                                        <button className="btn btn-success">
                                            <Link to={`/libro/${libro.id}`}style={{ color:'#fff',textDecoration:'none' }}>
                                                Detalle
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MostrarLibros;
