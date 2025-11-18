const KEY = (email) => `fln:reviews:${email || 'guest'}`

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
    } catch { 'error' }
}

export function getUserReviews(email) {
    return read(email)
}

export function addReview(email, review) {
    if (!email || !review) return
    const list = read(email)
    const id = review._id || (globalThis.crypto?.randomUUID ? crypto.randomUUID() : `local_${Date.now()}`)
    const postedDate = review.postedDate || new Date().toISOString()
    const enhanced = { ...review, _id: id, postedDate }
    list.unshift(enhanced)
    write(email, list)
    return enhanced
}

export function removeReview(email, id) {
    const list = read(email)
    const next = list.filter(r => r._id !== id)
    write(email, next)
}

export function updateReview(email, updated) {
    const list = read(email)
    const idx = list.findIndex(r => r._id === updated._id)
    if (idx !== -1) {
        list[idx] = { ...list[idx], ...updated }
        write(email, list)
    }
}
