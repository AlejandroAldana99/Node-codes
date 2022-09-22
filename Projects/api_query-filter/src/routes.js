/* Routes file */
import * as EntityController from "./Controllers/entity.controller";

const routes = router => {
	// Entity Controller
	router.post("/entities/filter", EntityController.getEntityList);
};

export default routes;
