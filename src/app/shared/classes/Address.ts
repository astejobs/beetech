import { AppUser } from './app-user';
import { UserInfo } from "./UserInfo";

export class Address {
  id:number;
  name:string;
  phoneNumber:string;
  pincode:string;
  address:string;
  landmark:string;
  user: AppUser;
}
