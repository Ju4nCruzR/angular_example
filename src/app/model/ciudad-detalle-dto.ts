import { CiudadDto } from './ciudad-dto';
import { CiudadProductoDto } from './ciudad-producto-dto';
import { CiudadServicioDto } from './ciudad-servicio-dto';
import { CiudadRutaDto } from './ciudad-ruta-dto';

export interface CiudadDetalleDto {
  ciudad: CiudadDto;
  productos: CiudadProductoDto[];
  servicios: CiudadServicioDto[];
  rutas: CiudadRutaDto[];
}
