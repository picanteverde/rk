const rk = require('../src/index')
const rk4 = require('ode-rk4')

// Lotka - Volterra
const LV = (A,B,C,D) => [
  (t, r, f) => A*r - (B*r*f),
  (t, r, f) => (-1)*C*f + D*r*f
]

const [R, F] = LV(0.1, 0.02, 0.3, 0.01)

const [Y, Z] = [
  (x,y,z) => z,
  (x,y,z) => 6*y-z
]

describe('resolve ode system of two functions between a range', () => {

  
  test('should get up to y10 and z10', () => {
    const initial = [0, 3, 1]
    const h = 0.1
    const solution = rk.iterate([Y,Z], initial, h, 10);
    
    const integrator = rk4([3,1],(dydt,y,t) => {
      dydt[0] = Y(0,0,y[1])
      dydt[1] = Z(0,y[0], y[1])
    },0,h)
    integrator.steps(10)
    expect(solution[10][1]).toBe(integrator.y[0])

  })

  test('should get Lotka Volterra', () => {
  // t, r0, f0
  const initial = [0, 40, 9]
  const h = 0.05
  const steps = 20 / 0.05
  const timeStartMine = Date.now()
  const solution = rk.iterate([R, F], initial, h, steps);
  console.log(`Mine: ${Date.now() - timeStartMine}`)

  const integrator = rk4([40,9],(dydt,y,t) => {
    dydt[0] = R(0,y[0],y[1])
    dydt[1] = F(0,y[0], y[1])
  },0,h)
  const timeStartThem = Date.now()
  integrator.steps(steps)
  console.log(`Them: ${Date.now() - timeStartThem}`)

  debugger
  expect(solution[400][1]).toBeCloseTo(integrator.y[0], 10)
  expect(solution[400][2]).toBeCloseTo(integrator.y[1], 10)
  })
})
