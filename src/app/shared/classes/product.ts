import { Category } from "./category";
import { Unit } from "./unit";
import { Image } from "./image";

export class Product {
  id:number;
  name:string;
  productStock:string;
  shortDescription:string;
  aboutProduct:string;
  description:string;
  //unit:Unit[]=[];
  category:Category;
  weight:string;
  flavour:string;
  price:number;
  discount:number;
  brand:string;
  packageInfo:string;
  productImages:String[]=[];
  //productImages:Image[]=[];
  images: any;
}
