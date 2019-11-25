import { Reimbursement } from '../models/reimbursement';
import { connectionPool } from '.';
import { multiReimbursementDTOtoReimbursement, reimbursementDTOtoReimbursement } from '../util/ReimbursementDTO-to-Reimbursemtent';
import { PoolClient } from 'pg';

// get the reimbursements with a given status Id
export async function daoGetReimbursementsByStatusId(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE status_id = $1 ORDER BY date_submitted DESC',
        [statusId]);
        if (result.rowCount === 0) {
            throw 'No Reimbursements By That Status';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'No Reimbursements By That Status') {
            throw {
                status: 404,
                message: 'No Reimbursements By That Status'
            };
        } else {
            throw{
                status: 500,
                Message: 'something went wrong with the server, try again later'
            };
        }

    } finally {
        client.release();
    }
}

// find reimbursements by user id and return the array
export async function daoGetReimbursementsByUserId(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.reimbursement NATURAL JOIN project_0.reimbursement_status NATURAL JOIN project_0.reimbursement_type WHERE author = $1 ORDER BY date_submitted DESC',
        [userId]);
        if (result.rowCount === 0) {
            throw 'No Reimbursements By That User';
        } else {
            return multiReimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'No Reimbursements By That User') {
            throw {
                status: 404,
                message: 'No Reimbursements By That User'
            };
        } else {
            throw{
                status: 500,
                Message: 'something went wrong with the server, try again later'
            };
        }

    } finally {
        client.release();
    }
}

// make a new reimbersement request
export async function daoPostReimbersement(post) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        client.query('BEGIN');
        await client.query('INSERT INTO project_0.reimbursement (author, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) values ($1,$2,now(),$3,$4,null,1,$5)',
            [post.author, post.amount, '0001/01/01', post.description, post.type]);
        const result = await client.query('SELECT * FROM project_0.reimbursement WHERE author = $1 ORDER BY reimbursement_id DESC LIMIT 1 OFFSET 0',
            [post.author]);
        client.query('COMMIT');
        return reimbursementDTOtoReimbursement(result.rows);
    } catch (e) {
        client.query('ROLLBACK');
        throw{
            status: 500,
            message: 'Internal Server Error'
        };
    } finally {
        client.release();
    }
}

// get a reimbersement by it's id
export async function daoGetReimbursementsByReimbursementId(reimbursementId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM project_0.reimbursement WHERE reimbursement_id = $1',
        [reimbursementId]);
        if (result.rowCount === 0) {
            throw 'Reimbursement Does Not Exist';
        } else {
            return reimbursementDTOtoReimbursement(result.rows);
        }
    } catch (e) {
        if (e === 'Reimbursement Does Not Exist') {
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}

// replace a reimbersemnt by it's id
export async function daoUpdateReimbursement(reimbursementUpdate: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        await client.query('UPDATE project_0.reimbursement SET date_resolved = now(), resolver = $1, status_id = $2 WHERE reimbursement_id = $3',
        [reimbursementUpdate.resolver, reimbursementUpdate.status, reimbursementUpdate.reimbursementId]);
        return await daoGetReimbursementsByReimbursementId(reimbursementUpdate.reimbursementId);
    } catch (e) {
        if (e === 'Reimbursement Does Not Exist') {
            throw{
                status: 404,
                message: 'Reimbursement Does Not Exist'
            };
        } else {
            throw{
                status: 500,
                message: 'Internal Server Error'
            };
        }
    } finally {
        client.release();
    }
}