import * as reimbursementsDao from "../repositories/reimbursement-dao";


//call the daoGetReimbursementsById and return the data once it's collected
export function getReimbursementsByStatusId(statusId: number){
    return reimbursementsDao.daoGetReimbursementsByStatusId(statusId)
}