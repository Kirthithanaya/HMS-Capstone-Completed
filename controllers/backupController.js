import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

export const backupDatabase = (req, res) => {
  const backupCommand = `mongodump --uri=${process.env.MONGO_URI} --out=./backup/`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ message: "Backup Failed", error });
    } else {
      res.status(200).json({ message: "Backup Successful", output: stdout });
    }
  });
};
