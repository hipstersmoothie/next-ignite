import path from "path";
import { execSync } from "child_process";
import { PAGES_DIR } from "./docs-data";

type User = [name: string, email: string];

export const getAuthor = (file?: string): User => {
  try {
    const target = file ? path.join(PAGES_DIR, file) : "HEAD";

    return execSync(`git log --format="%an || %ae" ${target} | tail -1`, {
      encoding: "utf8",
      stdio: ["pipe", "ignore", "ignore"],
    }).split(" || ") as User;
  } catch (error) {
    return ["", ""];
  }
};
