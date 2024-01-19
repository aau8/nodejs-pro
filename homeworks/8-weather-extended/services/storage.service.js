import { readFile, stat, writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { isArray, isString } from "../helpers/types.js";

const fileParentDir = "WeatherCLIApp";
const fileName = "data.json";
const filePath = join(homedir(), fileParentDir, fileName);
export const DEFAULT_LANGUAGE = "en"
export const TOKEN_DICTIONARY = {
    cities: "cities",
    apiToken: "api_token",
    language: "language",
};

const fileIsExists = async (path) => {
    try {
        await stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

const getContentAtJSON = async (path) => {
    const content = await readFile(filePath, "utf8");

    try {
        return content ? JSON.parse(content) : {};
    } catch (err) {
        await writeFile(filePath, "");
        return {};
    }
};

export const saveKeyValue = async (key, value) => {
    let data = {};

    if (await fileIsExists(filePath)) {
        data = await getContentAtJSON(filePath);
    }

    data[key] = value;

    await writeFile(filePath, JSON.stringify(data));
};

export const removeValueFromKey = async (key, value) => {
    if (!key) {
        throw new Error(
            "аргумент key в removeValueFromKey обязателен и может быть только непустой строкой"
        );
    }

    if (!value && !isString(value)) {
        throw new Error(
            "аргумент value в removeValueFromKey обязателен и может быть только непустой строкой"
        );
    }

    if (!(await fileIsExists(filePath))) {
        throw new Error(`У ключа ${key} нет значения ${value}`);
    }

    const data = await getContentAtJSON(filePath);
    const keyValue = data[key];

    if (!keyValue) {
        throw new Error("список городов пуст");
    }

    if (!isArray(keyValue)) {
        throw new Error(
            `значение ${value} не может быть удалено из ${key}, т.к. значение ${key} является строкой`
        );
    }

    const arr = data[key].filter((elem) => elem !== value);
    data[key] = arr.length ? arr : undefined;

    return await writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (key) => {
    if (!isString(key)) {
        throw new Error("переданный key должен быть строкой");
    }

    if (!(await fileIsExists(filePath))) {
        return undefined;
    }

    const data = await getContentAtJSON(filePath);

    return data[key];
};

export const getLanguage = async () => {
    return (process.env.LANGUAGE ?? (await getKeyValue(TOKEN_DICTIONARY.language))) || DEFAULT_LANGUAGE
}