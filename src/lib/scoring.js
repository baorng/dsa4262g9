const typeQuestions = {
  communication: [1, 6, 11, 16, 21, 26],
  appearance: [2, 7, 12, 17, 22, 27],
  social: [3, 8, 13, 18, 23, 28],
  performance: [4, 9, 14, 19, 24, 29],
  behavioural: [5, 10, 15, 20, 25, 30],
}

const reverseScoredQuestionIds = new Set([3, 8, 18, 21, 28])

export function normalizeScore(rawValue) {
  const value = Number(rawValue)
  if (!Number.isFinite(value) || value < 1 || value > 5) {
    throw new Error(`Invalid response value: ${rawValue}`)
  }
  return value
}

export function scoreQuestion(questionId, rawValue) {
  const value = normalizeScore(rawValue)
  if (reverseScoredQuestionIds.has(questionId)) {
    return 6 - value
  }
  return value
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function computeTypeScores(responses) {
  if (!Array.isArray(responses) || responses.length !== 30) {
    throw new Error('Responses must be an array of 30 values')
  }

  return Object.fromEntries(
    Object.entries(typeQuestions).map(([type, questionIds]) => {
      const scoredValues = questionIds.map((id) => scoreQuestion(id, responses[id - 1]))
      const typeScore = mean(scoredValues)
      return [type, Number(typeScore.toFixed(2))]
    }),
  )
}

export function getDominantTypes(scores) {
  const entries = Object.entries(scores)
  const highest = Math.max(...entries.map(([, value]) => value))
  const dominantTypes = entries
    .filter(([, value]) => value === highest)
    .map(([type]) => type)

  return {
    dominantTypes,
    dominantType: dominantTypes[0],
    highest: Number(highest.toFixed(2)),
  }
}

export function computeAssessment(responses) {
  const scores = computeTypeScores(responses)
  const { dominantTypes, dominantType, highest } = getDominantTypes(scores)

  return {
    scores,
    dominantTypes,
    dominantType,
    highest,
  }
}

export function interpretationLabel(score) {
  if (score <= 2) return 'Low'
  if (score < 4) return 'Moderate'
  return 'High'
}