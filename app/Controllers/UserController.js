const UserRepository = require("../Repository/UserRepository");
const User = require("../Models/User");
const Db = require("../../bootstrap/Db");

const db = new Db();
//création d'un objet qui va permettre de faire nos req sql
const repository = new UserRepository(db.client);

class UserController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async get() {
    //recuperation de l'id present dans l'url
    const id = this.getId();
    console.log(id);
    //if id alors get sinon all
    let result = id ? await repository.get(id) : await repository.all();

    if (id && !result.length) {
      this.response(404, "The user does not exist");
    } else {
      //map : transformer un tableau
      //donc permet de retirer le mdp grace au model user
      result = result.map((user) => new User(user));
      //stringify=> transform json en chaine de characteres
      this.response(200, JSON.stringify(result));
    }
  }

  async delete() {
    const id = this.getId();
    const result = await repository.delete(id);

    if (!result.length) {
      this.response(404, "The user does not exist");
    } else {
      this.response(204, "");
    }
  }

  async post() {
    //permet de convertir le body en json => exploitable en js
    this.req.body = await UserController.bodyParser(this.req);
    const user = this.req.body;
    console.log(user);
    if (!user.name || !user.email || !user.password) {
      this.response(422, "Unprocessable Entity");
    } else {
      const result = await repository.create(user);

      this.response(201, JSON.stringify(result));
    }
  }

  async put() {
    this.req.body = await UserController.bodyParser(this.req);
    const user = this.req.body;
    const id = this.getId();

    if (!user.name || !user.email || !user.password)
      this.response(422, "Unprocessable Entity");
    else {
      const result = await repository.update(id, user);

      if (!result.length) {
        this.response(404, "The user does not exist");
      } else {
        this.response(200, JSON.stringify(result));
      }
    }
  }

  getId() {
    const url = this.req.url.split("/");
    const id = url[url.length - 1];

    return id === "users" ? 0 : parseInt(id);
  }

  response(code, content) {
    this.res.statusCode = code;
    this.res.write(content);
    this.res.end();
  }

  /**
   * @author Suraj Sharma
   * @see {@link https://codeparadox.in/create-rest-api-and-crud-in-node-js-without-any-framework}
   */
  static async bodyParser(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          let result = JSON.parse(body);
          resolve(JSON.parse(body));
        });
      } catch (error) {
        reject(err);
      }
    });
  }
}

module.exports = UserController;
