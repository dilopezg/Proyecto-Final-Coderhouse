export default class CarritoDTO {
  constructor({ id, nombre, precio, descripcion, codigo, foto }) {
    this.id = id;
    this.productos = productos;
    this.timestamp = cart.timestamp;
  }
}

export function CarrAsDto(carr) {
  if (Array.isArray(carr)) return carr.map((c) => new CarritoDTO(c));
  else return new CarritoDTO(carr);
}
