import { isString } from "../helpers/types.js";
import { TOKEN_DICTIONARY, getKeyValue, getLanguage } from "./storage.service.js";
import axios from "axios";

export const getWeather = async () => {
    const apiToken =
        process.env.API_TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.apiToken));
    const cities =
        process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.cities));
    const language = await getLanguage();

    if (!apiToken) {
        throw new Error("не установлен api_token");
    }
    if (!cities) {
        throw new Error("не установлен city");
    }

    const citiesArr = isString(cities)
        ? cities.split(",").filter(Boolean)
        : cities;

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");

    return Promise.all(
        citiesArr.map(async city => {
            const { data } = await axios.get(url, {
                params: {
                    q: city,
                    appid: apiToken,
                    units: "metric",
                    lang: language,
                },
            });
            return data
        })
    )
};
