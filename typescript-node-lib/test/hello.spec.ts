import { expect } from 'chai'
import { hello_world, greet } from '../src/hello'
import sinon from 'sinon'

describe('helloworld', () => {
  it('publishes hello, world', () => {
    expect(hello_world()).to.equal('hello, world!')
  })
})

describe('testing the greeter', function () {
  it('checks the greet function', function () {
    const clock = sinon.useFakeTimers(new Date(2021, 0, 15))
    expect(greet('Simran')).to.equal(
      'Hello, Simran! Today is Friday, January 15, 2021'
    )
    clock.restore()
  })
})
