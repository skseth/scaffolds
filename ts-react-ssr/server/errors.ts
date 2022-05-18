// from https://www.rithmschool.com/blog/error-handling-express
/** Make error. Makes error from message or throws passed-in err  */

import { Request, Response, NextFunction } from 'express'

export class ApiError extends Error {
  #status: number
  #nestedError?: Error

  constructor(message: string | Error, status: number) {
    super(message instanceof Error? message.message : message)
    this.#status = status
    if (message instanceof Error) {
        this.#nestedError = message
    }
  };

  get status() {
      return this.#status
  }

  get NestedError() {
      return this.#nestedError
  }

  get nestedStack() {
     if (this.#nestedError) {
        return this.#nestedError.stack
     }
  }
}

export function makeError(message: string | Error, status: number): ApiError {
  //let err: Error = message instanceof Error ? message : new Error(message);
  return new ApiError(message, status)
}

/** handler for 404 routes. */

export function error404(req: Request, res: Response, next: NextFunction) {
  let err = makeError("Not Found", 404);
  // pass the error to the next piece of middleware
  return next(err);
}

/** general error handler */

export function handleRouteErrors(error: string | Error | ApiError, req: Request, res: Response, next: NextFunction) {
  // for actual JS exceptions, log the exception stack

  if ((error as ApiError).NestedError) {
      console.error((error as ApiError).nestedStack)
  } else if (error instanceof Error) {
    console.error(error.stack)
  }

  const status = (error as ApiError).status || 500

  res.status(status).json({ error: (error instanceof Error)? error.message: error });
}

