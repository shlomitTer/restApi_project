import ReqClass from "./reqClass.js";
import {toysReq_ar} from "./toysReq_ar.js"
import {userReq_ar} from "./userReq_ar.js"

window.onload=()=>{
  createUsersTable(userReq_ar);
  createToysTable(toysReq_ar);
}

const createUsersTable =(_ar)=>{
  _ar.forEach(item => {
    let routeTr = new ReqClass("#id_tbody_users",item);
    routeTr.render();
    
  });
}
 
const createToysTable=(_ar)=>{
  _ar.forEach(item => {
    let routeTr = new ReqClass("#id_tbody_prods",item);
    routeTr.render();
    
  });
}
