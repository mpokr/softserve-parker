import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import 'reflect-metadata' // required for typegraphql
import { graphql } from './graphql'
import { logger } from './logger'
import { isAuthorized } from './middleware/authorization'
import { delay } from './middleware/delay'
import { login, logout, signUp, confirmSignUp } from './middleware/authenticate'

const { NODE_ENV, PORT = 3000 } = process.env

async function main () {
  const app = express()
  app.use(helmet())
  app.use(cookieParser())
  app.use(cors())
  app.use(express.json())

  app.use('/login', login)
  app.use('/logout', logout)
  app.use('/signup', signUp)
  app.use('/confirm-registration', confirmSignUp)

  const graphQlDelay = NODE_ENV === 'production' ? 100 : 1000

  const server = await graphql
  // @ts-ignore
  app.use('/graphql', isAuthorized, delay(graphQlDelay), server.getMiddleware({ path: '/' }))

  app.use(express.static('public'))

  try {
    app.listen(PORT, () => {
      // @ts-ignore
      logger.info(`Success! Parker backend started in ${NODE_ENV.toUpperCase()} mode at http://127.0.0.1:${PORT}${server.graphqlPath }`)
    })
  } catch (e) {
    logger.error(`Error! Failed to start Apollo server. Error message: ${e}`)
  }
}

main()
