export function isImageUrl(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
}
