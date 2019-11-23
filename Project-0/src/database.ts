import { User } from "./models/user";
import { Reimbursement } from "./models/reimbursement";

//holder for users
export let users: User[] = [{
    userId: 1,
	username: "Finance Manager",
	password: "password",
	firstName: "Bob",
	lastName: "Richard",
	email: "bob.richard@notreal.com",
    roles: [{
        roleId: 1,
        role:"Finance Manager",
    }]
},
{
    userId: 2,
	username: "Admin",
	password: "password",
	firstName: "Michael",
	lastName: "Scott",
	email: "notbob.richard@notreal.com",
    roles: [{
        roleId: 2,
        role:"Admin"
    }],
}]

//holder for requests
export let reimbursements: Reimbursement[] = [{
    reimbursementId: 1,
	author: 2,
	amount: 100.00,
    dateSubmitted: 20,
    dateResolved: 21,
    description: "Embezelment",
    resolver: 1,
    status: 2,
    type: 1
},
{
    reimbursementId: 2,
	author: 1,
	amount: 2.00,
    dateSubmitted: 20,
    dateResolved: 21,
    description: "not embezelment",
    resolver: 1,
    status: 3,
    type: 1
}]