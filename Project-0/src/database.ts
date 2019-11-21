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
    role: {
        roleId: 1,
        role:"Finance Manager",
    }
},
{
    userId: 2,
	username: "Admin",
	password: "password",
	firstName: "Michael",
	lastName: "Scott",
	email: "notbob.richard@notreal.com",
    role: {
        roleId: 2,
        role:"Admin"
    },
}]

//holder for requests
export let reimbursements: Reimbursement[] = []