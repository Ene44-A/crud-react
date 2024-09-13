import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const EditarLibro = () => {

    const navigate = useNavigate(); // Hook para redireccionar
    const { register, handleSubmit } = useForm(); //hook de react hook form
    const [libro, setLibro] = useState(null);   //hook variable de estado 
    const { id } = useParams(); //hook de react router para obtener el id

    //  Hook para obtener el libro
    useEffect(() => {
        const LibroRef = doc(db, 'books', id);
        getDoc(LibroRef).then((e) => {
            setLibro({...e.data(), id: e.id});
        });
    }, [id]);

    //  Manejo de formulario para actualizar el libro
    const handleUpdateArticle = async (data) => {
        const libroRef = doc(db, 'books', id);
        await updateDoc(libroRef, {
            name: data.name,
            description: data.description,
        });
        await navigate('/');
    }

    return (
        <div className="container p-5">
             <div className="row p-5">
                {
                    libro &&
                    <div className="row">
                        <div className="col-4">
                            <img src={libro.img} className="img-fluid rounded-start" alt="..."/>
                        </div>
                        <form className='px-5 col-8' onSubmit={handleSubmit(handleUpdateArticle)}>
                            <div className="form-group my-2">
                                <label htmlFor="txt">Nombre del Libro</label>
                                <input type="text" className="form-control" 
                                defaultValue={libro.name} 
                                 {...register("name")} />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="txt">Descripción del Libro</label>
                                <textarea type="text-area" className="form-control h-100" 
                                defaultValue={libro.description} 
                                 {...register("description")} />
                            </div>
                            <div className="form-group my-2">
                                <input type="submit" className="btn btn-success" value="Actualizar" />
                            </div>
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export default EditarLibro;
