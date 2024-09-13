import { useState } from "react"; // Hooks de React
import { useForm } from "react-hook-form";  // Hook de react hook form
import { Link, useNavigate } from "react-router-dom";  // Hooks de react router dom
import { db, storage } from "../firebase/config";  // Variables de Firebase db y storage
import { addDoc, collection } from "firebase/firestore";   // Funciones de Firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";   // Funciones de Firebase Storage

const CrearLibro = () => {
    
    const { register, handleSubmit } = useForm(); // manejo de formulario
    const navigate = useNavigate(); // hook de react router para redireccionar
    const [fileUrl, setFileUrl] = useState(''); //variable  para guardar la url de la imagen
    const [fileUpload, setFileUpload] = useState(false); // variable del state de la imagen


    //  Sube  la imagen al storage 
    const handleFileUpload = async (e) => {
        try {
            const fileUrl = e.target.files[0]; // toma la img del input
            const fileRef = ref(storage, `images/${fileUrl.name}`); // crea la ruta de guardado
            await uploadBytes(fileRef, fileUrl); // subimos la imagen al storage
            const imgUrl = await getDownloadURL(fileRef);  // obtenemos la url de storage
            setFileUrl(imgUrl);  // guardamos la url en el state
            setFileUpload(true);  // cambiamos el state a true para que se muestre la imagen
        } catch (error) { 
            console.error("Error uploading file to Firebase Storage:", error);
            setFileUpload(false);
        }
    }

    //    Crea el registro con la img
    const createBook = async (data) => {
        try {
            const bookRef = collection(db, "books"); // creamos la coleccion de libros
            const dataBook = { // creamos el objeto con los datos del libro + la imagen
                name: data.name,
                description: data.description,
                img: fileUrl // variable que obtiene
            }
            const  docRef = await addDoc(bookRef, dataBook);  // creamos el registro
            console.log('Guardado' + docRef);  // mensaje de confirmacion
            await navigate('/');  // redireccionamos a la pagina principal
        } catch (error) {
            alert("Error al guardar el registro: " + error.message);
            console.error("Error writing document to Firestore:", error);
        }     
    }

    //  Llamado de la funcion de crear libro
    const handleCreateBook = (data) => {
        createBook(data);  // llamamos a la funcion de crear libro y le pasamos
    };
    
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
            <div className="p-5 m-5">
                {/* <button className="btn btn-primary">
                    <Link to={'/'}style={{ color:'#fff',textDecoration:'none' }}>
                        Home
                    </Link>
                </button> */}
                <div className="p-4 container row">
                    <div className="col-4">
                        {
                            fileUpload
                            ?
                            <img src={fileUrl} alt="Imagen del libro" width="200px" className="img-fluid" />
                            :
                            <img src="https://cdn-icons-png.flaticon.com/512/13434/13434974.png" width="200px" alt="" />
                        }
                    </div>
                    <form className='px-5 col-8' onSubmit={handleSubmit(handleCreateBook)} >
                        <div className="form-group my-2">
                            <label htmlFor="txt">Nombre del Libro *</label>
                            <input type="text" className="form-control" 
                            required {...register("name", { required: true })} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="txt">Descripción del Libro *</label>
                            <textarea type="text" className="form-control h-100" 
                            required {...register("description", { required: true })} />
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="txt">Imagen del Libro *</label>
                            <input type="file" className="form-control" 
                            onChange={handleFileUpload} />                      
                        </div>
                        {
                            fileUpload
                            ?
                            <div className="">
                                <div className="alert alert-success d-flex align-items-center" role="alert">
                                    <div className="mx-2">
                                        Portada guardada correctamente
                                    </div>
                                </div>
                                <div className="form-group my-2">
                                    <input type="submit" className="btn btn-success" value="Registrar" />
                                </div>
                            </div>
                            :
                            <div className="form-group my-2">
                                <input type="submit" className="btn btn-success disabled" value="Registrar" />
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CrearLibro;