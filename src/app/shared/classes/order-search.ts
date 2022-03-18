import { PageModel } from './page-model';
export class OrderSearch {
  id:number;
  orderId:string;
  status:string;
  orderedDate:Date;
  deliveredDate:Date;
  pageModel: PageModel;
}
