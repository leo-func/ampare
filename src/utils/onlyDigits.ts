export function onlyDigits(text: string) {
    return text.replace(/\D/g, "")
}