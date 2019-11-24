import { ReimbursementDTO } from "../dto-models/reimbursement";
import { Reimbursement } from "../models/reimbursement";

//takes a reimbursementDTO and turns it into a reimbursement object
//needs to be an array of one so that we can input result.rows
export function reimbursementDTOtoReimbursement(r: ReimbursementDTO[]):Reimbursement{
    return new Reimbursement(r[0].reimbursement_id, r[0].author, r[0].amount, r[0].date_submitted, r[0].date_resolved, r[0].description, r[0].resolver, r[0].status_id, r[0].type_id)
}

//take an array of reimbursementDTO's and turn them into an array of reimbursement objects
export function multiReimbursementDTOtoReimbursement(r: ReimbursementDTO[]):Reimbursement[]{
    let result = []
    for (let reimbursement of r){
        result.push(reimbursementDTOtoReimbursement([reimbursement]))
    }
    return result
}