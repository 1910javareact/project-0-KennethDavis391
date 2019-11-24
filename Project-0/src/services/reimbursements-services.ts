import * as reimbursementsDao from "../repositories/reimbursement-dao";


//call the daoGetReimbursementsByStatusId and return the data once it's collected
export function getReimbursementsByStatusId(statusId: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByStatusId(statusId)
    } catch (e) {
        throw e
    }
}

//call the daoGetReimbursementsByUserId and return the data once it's collected
export function getReimbursementsByUserId(userId: number) {
    try {
        return reimbursementsDao.daoGetReimbursementsByUserId(userId)
    } catch (e) {
        throw e
    }

}

//call the daoPostReimbersement and return the post
export function postReimbersement(post) {
    try {
        return reimbursementsDao.daoPostReimbersement(post)
    } catch (e) {
        throw e
    }

}

//call the daoPatchReimbersement and return the updated post
export async function patchReimbersement(patch) {
    try {
        let post = await reimbursementsDao.daoGetReimbursementsByReimbursementId(patch.reimbursementId)
        for (let key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key]
            }
        }
        return await reimbursementsDao.daoUpdateReimbursement(post)
    } catch (e) {
        throw e
    }

}