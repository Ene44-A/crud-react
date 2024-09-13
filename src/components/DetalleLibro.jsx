import { useState, useEffect } from 'react'; 
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link, useNavigate, useParams } from 'react-router-dom';

const DetalleLibro = () => {
    
    const [libro, setLibro] = useState(null);   //hook variable de estado 
    const { id } = useParams(); //hook de react router para obtener el id
    const navigate = useNavigate(); //hook de react router para redireccionar
    
    //hook para obtener el libro
    useEffect(() => {
        const LibroRef = doc(db, 'books', id);
        getDoc(LibroRef).then((e) => {
            setLibro({...e.data(), id: e.id});
        });
    }, [id]);

    //funcion para eliminar libro
    const handleDelete = async(id) => {
        const libroRef = doc(db, 'books', id);
        await deleteDoc(libroRef);
        await navigate('/');
    }
     
    return (
        <div className="">
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid">
                    <button className="btn btn-primary">
                        <a class="navbar-brand">
                            <Link to={'/'}
                                style={{ color:'#fff',textDecoration:'none' }}>
                                Home
                            </Link>
                        </a>
                    </button>
                </div>
            </nav>
            <div className="container p-5">
                {/* <button className="btn btn-secondary m-4">
                    <Link to={`/`}style={{ color:'#fff',textDecoration:'none' }}>
                        Home
                    </Link>
                </button> */}
                {
                    libro &&
                    <div className="row">
                        <div className="col-md-6">
                            <img src={libro.img} className="img-fluid"/>
                        </div>
                        <div className="col-md-6">
                            <div className="card" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{libro.name}</h5>
                                    <p className="card-text">{libro.description}</p>
                                    <button className="btn btn-primary mx-2">
                                        <Link to={`/edit/${libro.id}`}
                                        style={{ color:'#fff',textDecoration:'none' }}>
                                            Editar
                                        </Link>
                                    </button>
                                    <button className="btn btn-danger m-4" 
                                        onClick={() => handleDelete(libro.id)}>
                                            Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default DetalleLibro;
