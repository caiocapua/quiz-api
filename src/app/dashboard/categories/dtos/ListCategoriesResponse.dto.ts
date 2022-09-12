import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';

export class Categories {
  @IsNumber()
  id: number;

  @IsString()
  categoryName: string;

  @IsString()
  urlImage: string;
}

export class ListCategoriesResponse {
  @IsArray()
  items: Categories[];
}
