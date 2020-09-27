const rk = require('../src/index')
const rk4 = require('ode-rk4')

// Lotka - Volterra
const LV = (A,B,C,D) => [
  (t, r, f) => A*r - (B*r*f),
  (t, r, f) => (-1)*C*f + D*r*f
]

const [R, F] = LV(0.1, 0.02, 0.3, 0.01)

describe('resolve ode system of two functions faster than the standard', () => {

test('should get Lotka Volterra', () => {
  // t, r0, f0
  const initial = [0, 40, 9]
  const h = 0.05
  const steps = 200 / 0.05

  const timeStartRk = Date.now()
  const solution = rk.iterate([R, F], initial, h, steps);
  const timeRk = Date.now() - timeStartRk

  const integrator = rk4([40,9],(dydt,y,t) => {
    dydt[0] = R(0,y[0],y[1])
    dydt[1] = F(0,y[0], y[1])
  },0,h)

  const timeStartStandard = Date.now()
  integrator.steps(steps)
  const timeStandard = Date.now() -timeStartStandard
  expect(timeRk).toBeLessThan(timeStandard)
  })
})
