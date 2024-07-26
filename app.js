process.on('uncaughtException', (err) => { console.log('err in code', err) })
import express from 'express'
import dbConnections from './DataBase/db.connections.js'
import applicationRouter from './src/modules/aplications/application.routes.js'
import authRouter from './src/modules/authentication/auth.routes.js'
import companyRouter from './src/modules/Companies/company.routes.js'
import jobsRouter from './src/modules/jobs/jobs.routes.js'
import userRouter from './src/modules/users/users.routes.js'
import AppError from './src/utils/appError.js'
import globalErrorHandler from './src/utils/globalError.js'
const app = express()
const port = process.env.PORT


/* Global */

app.use(express.json())

/* Connections */

dbConnections()

/* Routes */

// ===>  Auth 

app.use('/auth', authRouter)

// ===>  users  

app.use('/users', userRouter)

// ===>  Companies  

app.use('/companies', companyRouter)

// ===>  Jobs  

app.use('/jobs', jobsRouter)

// ===>  Applications  

app.use('/applications', applicationRouter)







/* Err Handel Routes */
app.use('*', (req, res, next) => {
    next(new AppError(`route not found ${req.originalUrl}`, 404))
})


/* Err Handdilig */

app.use(globalErrorHandler)


process.on('unhandledRejection', (err) => {
    console.log('error', err)
})


app.get('/', (req, res) => res.send('Abdelrhman'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))