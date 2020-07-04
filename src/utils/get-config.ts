import path from "path";
import { cosmiconfigSync } from "cosmiconfig";

const explorer = cosmiconfigSync("ignite");

export const getConfig = () => {
  const { config = {} } = explorer.search() || {};

  if (!config.name) {
    try {
      const packageJSON = require(path.join(process.cwd(), "package.json"));
      config.name = packageJSON.name;
    } catch (error) {}
  }

  return config;
};
