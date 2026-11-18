export function rangeError(text: string, min: number, max: number, unit: string) {
    const value = Number(text)
    if (!text || !Number.isInteger(value) || value < min || value > max) {
        return `Use um valor de ${min} a ${max}${unit}`
    }
    return ""
}