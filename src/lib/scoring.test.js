import { describe, expect, it } from 'vitest'
import { computeAssessment, computeTypeScores, scoreQuestion } from './scoring'

describe('scoring logic', () => {
  it('applies reverse scoring correctly', () => {
    expect(scoreQuestion(3, 5)).toBe(1)
    expect(scoreQuestion(3, 1)).toBe(5)
    expect(scoreQuestion(1, 4)).toBe(4)
  })

  it('computes type scores from 30 responses', () => {
    const responses = Array(30).fill(3)
    const scores = computeTypeScores(responses)

    expect(scores).toEqual({
      communication: 3,
      appearance: 3,
      social: 3,
      performance: 3,
      behavioural: 3,
    })
  })

  it('detects ties for dominant type', () => {
    const responses = Array(30).fill(1)

    ;[1, 6, 11, 16, 26].forEach((id) => {
      responses[id - 1] = 5
    })

    ;[2, 7, 12, 17, 22, 27].forEach((id) => {
      responses[id - 1] = 5
    })

    ;[4, 9, 14, 19, 24, 29].forEach((id) => {
      responses[id - 1] = 2
    })

    ;[5, 10, 15, 20, 25, 30].forEach((id) => {
      responses[id - 1] = 2
    })

    ;[3, 8, 18, 28].forEach((id) => {
      responses[id - 1] = 5
    })

    const assessment = computeAssessment(responses)
    expect(assessment.dominantTypes).toContain('communication')
    expect(assessment.dominantTypes).toContain('appearance')
  })
})
