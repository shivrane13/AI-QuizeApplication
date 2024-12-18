const db = require("../data/database");

class User {
  constructor(userData) {
    (this.id = userData.id),
      (this.name = userData.name),
      (this.email = userData.email),
      (this.password = userData.password),
      (this.collage = userData.collage);
  }

  async save() {
    try {
      if (!this.id) {
        const [existingUser] = await db.query(
          "select * from user where email = ?",
          this.email
        );
        let res;
        console.log(existingUser);
        if (existingUser.length == 0) {
          const data = [this.email, this.password];
          res = await db.query(
            "INSERT INTO user (email, password) VALUES (?)",
            [data]
          );
        } else {
          res = { message: "Existing User" };
        }
        return res;
      } else {
        const updateData = [
          this.name,
          this.email,
          this.password,
          this.collage,
          this.id,
        ];
        const res = await db.query(
          "UPDATE user SET name = ?, email = ?, password=?, collage = ? where id = ? ",
          updateData
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async findUser(email, password) {
    try {
      const [res] = await db.query(
        "SELECT * FROM user WHERE email=? AND password = ?",
        [email, password]
      );
      return res[0];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
