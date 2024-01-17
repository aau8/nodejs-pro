export const isString = (value) => {
    return value.length && !Array.isArray(value)
}