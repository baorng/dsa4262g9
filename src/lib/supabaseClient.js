import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

export async function getNextAttemptNumber(sessionId) {
  if (!supabase) {
    return 1
  }

  const { data, error } = await supabase
    .from('quiz_results')
    .select('attempt_number')
    .eq('session_id', sessionId)
    .order('attempt_number', { ascending: false })
    .limit(1)

  if (error) {
    throw error
  }

  if (!data || data.length === 0) {
    return 1
  }

  return Number(data[0].attempt_number) + 1
}

export async function insertQuizResult(payload) {
  if (!supabase) {
    return null
  }

  const { data, error } = await supabase
    .from('quiz_results')
    .insert(payload)
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getPreviousAttempt(sessionId, currentAttemptNumber) {
  if (!supabase || currentAttemptNumber <= 1) {
    return null
  }

  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .eq('session_id', sessionId)
    .eq('attempt_number', currentAttemptNumber - 1)
    .limit(1)

  if (error) {
    throw error
  }

  return data?.[0] ?? null
}

export async function getAllResults() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .order('taken_at', { ascending: true })

  if (error) {
    throw error
  }

  return data ?? []
}