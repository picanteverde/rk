const rk = require('../src/index')
const rk4 = require('ode-rk4')

// Lotka - Volterra
const LV = (A,B,C,D) => [
  (t, r, f) => A*r - (B*r*f),
  (t, r, f) => (-1)*C*f + D*r*f
]

const [R, F] = LV(0.1, 0.02, 0.3, 0.01)
// t, r0, f0
// const initial = [0, 40, 9]
// const h =0.05

const logistic = (r, k) => (t, x) => r * x * (1 - x / k)
const l = logistic(0.7, 2)

const [Y, Z] = [
  (x,y,z) => z,
  (x,y,z) => 6*y-z
]

describe('resolve ode system of two functions', () => {

  test('should get x1', () => {
    const h = 0.1
    const initial = [0, 0.1]
    const [x1] = rk.rk([l], initial, h)

    expect(x1).toBe(0.10686339357583563)

  })

  test('should get y1 and z1', () => {
    const initial = [0, 3, 1]
    const h = 0.1
    
    const [y1] = rk.rk([Y,Z],initial, h)

    const integrator = rk4([3,1],(dydt,y,t) => {
      dydt[0] = Y(0,0,y[1])
      dydt[1] = Z(0,y[0], y[1])
    },0,h)
    integrator.steps(1)

    expect(y1).toBe(integrator.y[0])
  })

  test('should get up to y10 and z10', () => {
    const initial = [0, 3, 1]
    const h = 0.1
    const [y1,z1] = rk.rk([Y,Z],initial, h)
    const [y2,z2] = rk.rk([Y,Z],[h*1, y1, z1], h)
    const [y3,z3] = rk.rk([Y,Z],[h*2, y2, z2], h)
    const [y4,z4] = rk.rk([Y,Z],[h*3, y3, z3], h)
    const [y5,z5] = rk.rk([Y,Z],[h*4, y4, z4], h)
    const [y6,z6] = rk.rk([Y,Z],[h*5, y5, z5], h)
    const [y7,z7] = rk.rk([Y,Z],[h*6, y6, z6], h)
    const [y8,z8] = rk.rk([Y,Z],[h*7, y7, z7], h)
    const [y9,z9] = rk.rk([Y,Z],[h*8, y8, z8], h)
    const [y10,z10] = rk.rk([Y,Z],[h*9, y9, z9], h)

    const integrator = rk4([3,1],(dydt,y,t) => {
      dydt[0] = Y(0,0,y[1])
      dydt[1] = Z(0,y[0], y[1])
    },0,h)
    integrator.steps(10)

    expect(y10).toBe(integrator.y[0])

  })
})
