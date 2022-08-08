// customMiddleware.js

const defaults = {}

const checkEnv = (opts) => {
  const options = { ...defaults, ...opts }

  const customMiddlewareBefore = async (request) => {
    const { event, context } = request
  }

  const customMiddlewareAfter = async (request) => {
    const { response } = request
    request.response = response
  }

  const customMiddlewareOnError = async (request) => {
    if (request.response === undefined) return

    return customMiddlewareAfter(request)
  }

  return {
    before: customMiddlewareBefore,
    after: customMiddlewareAfter,
    onError: customMiddlewareOnError
  }
}

export default checkEnv