import { User } from "./models/user";
import { Reimbursement } from "./models/reimbursement";

//holder for users
export let users: User[] = [{
    userId: 0,
	username: "Finance Manager",
	password: "password",
	firstName: "Bob",
	lastName: "Richard",
	email: "bob.richard@notreal.com",
    role: {
        roleId: 1,
        role:"Finance Manager"
    }
}]

//holder for requests
export let reimbursements: Reimbursement[] = []