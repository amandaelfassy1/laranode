class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async all() {
    const res = await this.query("SELECT * FROM users");

    return res;
  }

  async get(id) {
    const res = await this.query("SELECT * FROM users WHERE id = $1", [id]);

    return res;
  }

  async delete(id) {
    const res = await this.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    return res;
  }

  async create(user) {
    const res = await this.query(
      "INSERT INTO users(name, email, password, created_at) VALUES($1, $2, $3, $4) RETURNING *",
      [user.name, user.email, user.password, new Date()]
    );

    return res;
  }

  async update(id, user) {
    const res = await this.query(
      "UPDATE users SET name = $1, email = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING *",
      [user.name, user.email, user.password, new Date(), id]
    );

    return res;
  }

  async query(text, values) {
    text = text || "";
    values = values || [];

    try {
      const res = await this.db.query(text, values);
      return res.rows;
    } catch (err) {
      console.error(err.stack);
      return [];
    }
  }
}

module.exports = UserRepository;
