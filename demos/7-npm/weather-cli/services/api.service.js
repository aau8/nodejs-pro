import { TOKEN_DICTIONARY, getKeyValue } from "./storage.service.js";
import axios from "axios";

export const getWeather = async () => {
    const apiToken = await getKeyValue(TOKEN_DICTIONARY.apiToken);
    const city = await getKeyValue(TOKEN_DICTIONARY.city);

    if (!apiToken) {
        throw new Error("не установлен api_token");
    }
    if (!city) {
        throw new Error("не установлен city");
    }

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    const params = {
        q: city,
        appid: apiToken,
        units: "metric",
        lang: "ru",
    };

    const { data } = await axios.get(url, { params });

    return data
};

// export const getWeather = async () => {
//     const apiToken = await getKeyValue(TOKEN_DICTIONARY.apiToken)
//     const city = await getKeyValue(TOKEN_DICTIONARY.city)

//     if (!apiToken) {
//         throw new Error("не установлен api_token")
//     }
//     if (!city) {
//         throw new Error("не установлен city")
//     }

//     const url = new URL("https://api.openweathermap.org/data/2.5/weather")
//     const params = {
//         q: city,
//         appid: apiToken,
//         units: "metric",
//         lang: "ru",
//     }

//     Object.entries(params).forEach(([key, value]) => {
//         url.searchParams.append(key, value)
//     })

//     return new Promise((resolve, reject) => {
//         https.get(url, (res) => {
//             res.on("data", (chunk) => {
//                 resolve(JSON.parse(chunk))
//             })

//             res.on("error", (err) => {
//                 reject(err)
//             })
//         })
//     })
// }
