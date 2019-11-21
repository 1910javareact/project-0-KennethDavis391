import { reimbursements } from "../database";


//get the reimbursements with a given status Id
export function daoGetReimbursementsByStatusId(statusId: number){
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

//find reimbursements by user id and return the array
export function daoGetReimbursementsByUserId(userId: number){
    let filteredReimbursements = [...reimbursements]
    filteredReimbursements = filteredReimbursements.filter((ele,index,arr)=>{
        if(userId === ele.author){
            return true
        }else{
            return false
        }
    })
    return filteredReimbursements
}