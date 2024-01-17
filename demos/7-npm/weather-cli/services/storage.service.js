import { readFile, stat, writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { isString } from "../helpers/types.js";

const filePath = join(homedir(), "WeatherCLIApp/data.json");
export const TOKEN_DICTIONARY = {
    city: "city",
    apiToken: "api_token"
}

const fileIsExists = async (path) => {
    try {
        await stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

export const saveKeyValue = async (key, value) => {
    let data = {};

    if (await fileIsExists(filePath)) {
        data = JSON.parse(await readFile(filePath));
    }

    data[key] = value;

    await writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
    if (!isString(key)) {
        throw new Error("переданный key должен быть строкой");
    }

    if (!(await fileIsExists(filePath))) {
        return undefined;
    }

    const data = JSON.parse(await readFile(filePath));

    return data[key];
};
