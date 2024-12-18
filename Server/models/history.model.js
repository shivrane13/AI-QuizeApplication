const db = require("../data/database");
class History {
  constructor(hisotryData) {
    (this.id = hisotryData.id),
      (this.title = hisotryData.title),
      (this.highscore = hisotryData.highscore),
      (this.correct = hisotryData.correct),
      (this.wrong = hisotryData.wrong),
      (this.questions = hisotryData.questions),
      (this.userId = hisotryData.userId);
  }

  async save() {
    try {
      if (!this.id) {
        const submitData = [
          this.title,
          this.highscore,
          this.correct,
          this.wrong,
          this.questions,
          this.userId,
        ];

        const res = await db.query(
          "INSERT INTO history(title, highscore, correct, wrong, questions, userId ) values (?)",
          [submitData]
        );
        return res;
      } else {
        const updateData = [this.highscore, this.correct, this.wrong, this.id];
        await db.query(
          "UPDATE history SET highscore = ? , correct = ? , wrong = ? where id = ?",
          updateData
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getHistory(userId) {
    try {
      const [res] = await db.query(
        "SELECT * FROM history WHERE userId = ?",
        userId
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  static async getHistoryById(id) {
    try {
      const [res] = db.query("SELECT * FROM history WHERE id = ?", id);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = History;
