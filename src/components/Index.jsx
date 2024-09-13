import MostrarLibros from "./MostrarLibros";
import Navbar from "./Navbar";

const Index = () => {
    return (
        <div>
            <Navbar />
            <div className="py-5 my-5 text-center">
                <h1 className="display-5 fw-bold text-body-emphasis">CRUD con React</h1>
                    <div className="col-lg-8 mx-auto">
                    <MostrarLibros />
                </div>
            </div>
           
        </div>
    );
}

export default Index;
