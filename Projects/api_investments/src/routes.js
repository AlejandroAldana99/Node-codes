// Require Own Modules
import * as AccountController from "./Modules/Accounts/Accounts.Controller";

const routes = router => {
	// Routes declaration
	router.post("/accounts", AccountController.createAccount);
	router.post("/accounts/:id/orders", AccountController.buysell);

};

export default routes;
