import { ReimbursementDTO } from "../dto-models/reimbursement";
import { Reimbursement } from "../models/reimbursement";

//takes a reimbursementDTO and turns it into a reimbursement object
export function reimbursementDTOtoReimbursement(r: ReimbursementDTO):Reimbursement{
    return new Reimbursement(r.reimbursement_id, r.author, r.amount, r.date_submitted, r.date_resolved, r.description, r.resolver, r.status, r.type)
}

//take an array of reimbursementDTO's and turn them into an array of reimbursement objects
export function multiReimbursementDTOtoReimbursement(r: ReimbursementDTO[]):Reimbursement[]{
    let result = []
    for (let reimbursement of r){
        result.push(reimbursementDTOtoReimbursement(reimbursement))
    }
    return result
}