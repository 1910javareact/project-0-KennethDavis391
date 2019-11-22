import { reimbursements } from "../database";
import { Reimbursement } from "../models/reimbursement";

let reimbursementId = 3
//get the reimbursements with a given status Id
export function daoGetReimbursementsByStatusId(statusId: number){
    let filteredReimbursements = [...reimbursements]
    try{
        filteredReimbursements = filteredReimbursements.filter((ele,index,arr)=>{
            if(statusId === ele.status){
                return true
            }else{
                return false
            }
        })
    }catch{
        throw{
            status:500,
            Message: 'something went wrong with the server, try again later'
        }
    }
    return filteredReimbursements
}

//find reimbursements by user id and return the array
export function daoGetReimbursementsByUserId(userId: number){
    let filteredReimbursements = [...reimbursements]
    try{
        filteredReimbursements = filteredReimbursements.filter((ele,index,arr)=>{
            if(userId === ele.author){
                return true
            }else{
                return false
            }
        })
    }catch{
        throw{
            status:500,
            Message: 'something went wrong with the server, try again later'
        }
    }
    return filteredReimbursements
}

//make a new reimbersement request
export function daoPostReimbersement(post){
    post.reimbursementId = reimbursementId
    post.dateResolved = -1
    post.resolver = null
    post.status = 1

    reimbursementId++

    reimbursements.push(post)

    return post
}

//get a reimbersement by it's id
export function daoGetReimbursementsByReimbursementId(reimbersementId: number){
    for(let reimbersement of reimbursements){
        if(reimbersement.reimbursementId === reimbersementId){
            return reimbersement
        }
    }
    throw{
        status: 404,
        message: 'ReimbersementId not found'
    }
}

//replace a reimbersemnt by it's id
export function daoReplaceReimbursement(reimbursementUpdate: Reimbursement){
    for(let reimbursement of reimbursements){
        if(reimbursementUpdate.reimbursementId === reimbursement.reimbursementId){
            reimbursement = reimbursementUpdate
            return
        }
    }
    throw{
        status: 404,
        message: 'ReimbersementId not found'
    }
}