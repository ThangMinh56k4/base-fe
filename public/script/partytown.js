const WORKER_FUNCTION_OPTIONS = {
  heavyCalculation: {
    name: 'heavyCalculation',
    type: 'calculationComplete',
  }
}

function heavyCalculation(num) {
  let sum = 0
  for (let i = 0; i < num; i++) {
    sum += i
  }
  return sum
}

self.onmessage = event => {
  const { action, data } = event.data

  if (!action || !data) {
    return
  }

  if (action === WORKER_FUNCTION_OPTIONS.heavyCalculation.name) {
    const result = heavyCalculation(data)
    self.postMessage({ type: WORKER_FUNCTION_OPTIONS.heavyCalculation.type, data: result })
  }
}
