import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = ({ history }) => {
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  const dispatch = useDispatch();
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const { alerta } = useSelector((state) => state.alerta);

  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || precio <= 0) {
      const respuesta = {
        msg: "ambos campos son obligatorios",
        classes: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(respuesta));
    } else {
      dispatch(ocultarAlertaAction());
      agregarProducto({ nombre, precio });
      if (!error) history.push("/");
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weigth-bold">
              Agreagar Nuevo Producto
            </h2>
            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando && <p>Cargando...</p>}
            {error && (
              <p className="alerta alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
