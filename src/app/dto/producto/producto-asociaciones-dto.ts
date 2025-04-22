import { ProductoDto } from './producto-dto';
import { CiudadProductoDto } from '../ciudad/ciudad-producto-dto';
import { CaravanaProductoDto } from '../caravana/caravana-producto-dto';

export class ProductoAsociacionesDto {
  producto!: ProductoDto;
  enCiudades: CiudadProductoDto[] = [];
  enCaravanas: CaravanaProductoDto[] = [];
}
