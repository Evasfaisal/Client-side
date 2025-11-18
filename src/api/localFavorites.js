const KEY = (email) => `fln:favorites:${email || 'guest'}`

function read(email) {
    try {
        const raw = localStorage.getItem(KEY(email))
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

function write(email, arr) {
    try {
        localStorage.setItem(KEY(email), JSON.stringify(arr || []))
    } catch {'error' }
}

export function getFavoriteIds(email) {
    return read(email).map((r) => r?._id).filter(Boolean)
}

export function getFavoriteReviews(email) {
    return read(email)
}

export function addFavorite(email, review) {
    if (!review || !review._id) return
    const list = read(email)
    const exists = list.find((r) => r._id === review._id)
    if (exists) return
    list.push(review)
    write(email, list)
}

export function removeFavorite(email, reviewId) {
    const list = read(email)
    const next = list.filter((r) => r._id !== reviewId)
    write(email, next)
}

export function clearFavorites(email) {
    write(email, [])
}
