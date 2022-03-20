class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}

module.exports = User;
