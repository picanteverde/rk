const rk = require('../src/index')

const logistic = (r, k) => (t, x) => r * x * (1 - x / k)

const l = logistic(0.7, 2)
const h = 0.1
const initial = [0, 0.1]
const k = [h]

describe('resolve one ode', () => {
  test('should get correct k1', () => {
    k[1] = rk.t(l, initial, rk.factors[0], [h, 0])
    expect(k[1]).toBe(0.00665)
  })

  test('should get correct k2', () => {
    k[2] = rk.t(l, initial, rk.factors[1], [h, k[1]])
    expect(k[2]).toBe(0.006859088053125)
  })

  test('should get correct k3', () => {
    k[3] = rk.t(l, initial, rk.factors[2], [h, k[2]])
    expect(k[3]).toBe(0.006865649611645383)
  })

  test('should get correct k4', () => {
    k[4] = rk.t(l, initial, rk.factors[3], [h, k[3]])
    expect(k[4]).toBe(0.007080886125473013)
  })

  test('should get correct x1', () => {
    const x1 = rk.next(initial[1], k[1], k[2], k[3], k[4])
    expect(x1).toBe(0.10686339357583563)
  })
})
