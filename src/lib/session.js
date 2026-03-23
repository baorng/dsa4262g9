const SESSION_KEY = 'user_session_id'
const LAST_RESULT_KEY = 'latest_quiz_result'

export function getSessionId() {
  return localStorage.getItem(SESSION_KEY)
}

export function ensureSessionId() {
  const existing = getSessionId()
  if (existing) {
    return existing
  }

  const id = crypto.randomUUID()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

export function saveLatestResult(result) {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result))
}

export function getLatestResult() {
  const raw = localStorage.getItem(LAST_RESULT_KEY)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}