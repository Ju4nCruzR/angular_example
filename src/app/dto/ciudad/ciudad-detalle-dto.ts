import { CiudadDto } from './ciudad-dto';
import { CiudadProductoDto } from './ciudad-producto-dto';
import { CiudadServicioDto } from './ciudad-servicio-dto';
import { CiudadRutaDto } from './ciudad-ruta-dto';

export class CiudadDetalleDto {
  ciudad!: CiudadDto;
  productos: CiudadProductoDto[] = [];
  servicios: CiudadServicioDto[] = [];
  rutas: CiudadRutaDto[] = [];
}
