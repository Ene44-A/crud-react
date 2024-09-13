import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const CrearLibro = () => {
    
    const { register, handleSubmit } = useForm(); // manejo de formulario
    const navigate = useNavigate(); // hook de react router para redireccionar
    const [fileUrl, setFileUrl] = useState(''); //variable  para guardar la url de la imagen
    const [fileUpload, setFileUpload] = useState(false); // variable del state de la imagen


    //  Sube  la imagen al storage 
    const handleFileUpload = async (e) => {
        try {
            const fileUrl = e.target.files[0];
            const fileRef = ref(storage, `images/${fileUrl.name}`);
            await uploadBytes(fileRef, fileUrl);
            const imgUrl = await getDownloadURL(fileRef);
            setFileUrl(imgUrl);
            setFileUpload(true);
            console.log(imgUrl);          
        } catch (error) {
            console.error("Error uploading file to Firebase Storage:", error);
            setFileUpload(false);
        }
    }

    //    Crea el registro con la img
    const createBook = async (data) => {
        try {
            const bookRef = collection(db, "books");
            const dataBook = {
                name: data.name,
                description: data.description,
                img: fileUrl
            }
            const  docRef = await addDoc(bookRef, dataBook);
            await navigate('/');
        } catch (error) {
            alert("Error al guardar el registro: " + error.message);
            console.error("Error writing document to Firestore:", error);
        }     
    }

    //  Llamado de la funcion de crear libro
    const handleCreateBook = (data) => {
        createBook(data);
    };
    
    return (
        <div className="p-5 m-5">
            <div className="p-4 container row">
                <div className="col-4">
                    {
                        fileUpload
                        ?
                        <img src={fileUrl} alt="Imagen del libro" width="150px" className="img-fluid" />
                        :
                        <img src="https://cdn-icons-png.flaticon.com/512/13434/13434974.png" width="150px" alt="" />
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
                        <input type="file" className="form-control" onChange={handleFileUpload} />                      
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
    );
}

export default CrearLibro;
