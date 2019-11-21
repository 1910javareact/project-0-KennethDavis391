import * as reimbursementsDao from "../repositories/reimbursement-dao";


//call the daoGetReimbursementsByStatusId and return the data once it's collected
export function getReimbursementsByStatusId(statusId: number){
    return reimbursementsDao.daoGetReimbursementsByStatusId(statusId)
}

//call the daoGetReimbursementsByUserId and return the data once it's collected
export function getReimbursementsByUserId(userId: number){
    return reimbursementsDao.daoGetReimbursementsByUserId(userId)
}