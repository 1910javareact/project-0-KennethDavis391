import { reimbursements } from "../database";


//get the reimbursements with a given status Id
export function daoGetReimbursementsByStatusId(statusId){
    let filteredReimbursements = [...reimbursements]
    filteredReimbursements = filteredReimbursements.filter((ele,index,arr)=>{
        if(statusId === ele.status){
            return true
        }else{
            return false
        }
    })
    return filteredReimbursements
}