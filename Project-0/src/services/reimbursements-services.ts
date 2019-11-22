import * as reimbursementsDao from "../repositories/reimbursement-dao";


//call the daoGetReimbursementsByStatusId and return the data once it's collected
export function getReimbursementsByStatusId(statusId: number){
    return reimbursementsDao.daoGetReimbursementsByStatusId(statusId)
}

//call the daoGetReimbursementsByUserId and return the data once it's collected
export function getReimbursementsByUserId(userId: number){
    return reimbursementsDao.daoGetReimbursementsByUserId(userId)
}

//call the daoPostReimbersement and return the post
export function postReimbersement(post){
    return reimbursementsDao.daoPostReimbersement(post)
}

//call the daoPatchReimbersement and return the updated post
export function patchReimbersement(patch){
    let post = reimbursementsDao.daoGetReimbursementsByReimbursementId(patch.reimbersementId)
    for (let key in post){
        if(patch.hasOwnProperty(key)){
            post[key] = patch[key]
        }
    }
    reimbursementsDao.daoReplaceReimbursement(post)
    return(post)
}