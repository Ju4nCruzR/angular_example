import { ProductoDto } from './producto-dto';
import { CiudadProductoDto } from './ciudad-producto-dto';
import { CaravanaProductoDto } from './caravana-producto-dto';

export interface ProductoAsociacionesDto {
  producto: ProductoDto;
  enCiudades: CiudadProductoDto[];
  enCaravanas: CaravanaProductoDto[];
}
