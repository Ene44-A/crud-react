import MostrarLibros from "./MostrarLibros";

const Index = () => {
    return (
        <div>
            <h1>Index</h1>
            <button className="btn btn-primary" onClick={()=>console.log('Hola Mundo')}>Indresar</button>
            <MostrarLibros />
        </div>
    );
}

export default Index;
