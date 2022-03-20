const UserController = require("../app/Controllers/UserController");
//création d'un objet
const router = {};

//ajout de méthodes à cet objet
router.get = (req, res) => {
  const userController = new UserController(req, res);
  userController.get();
};

router.post = (req, res) => {
  const userController = new UserController(req, res);
  userController.post();
};

router.put = (req, res) => {
  const userController = new UserController(req, res);
  userController.put();
};

router.delete = (req, res) => {
  const userController = new UserController(req, res);
  userController.delete();
};

//export default
module.exports = router;
