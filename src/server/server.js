/*
 server를 실행할 코드 
 express.js를 사용함
*/
const express  = require('express');
const  SERVER = require('./schema')


const cors = require('cors');
const express = require('express');
const db = require('./db');

// 보안으로 process.env에 저장하는데 .env파일에 보관하고 gitignore해야함.
const port = process.env.PORT || 9000;
const app = express();

const fs = require('fs');
// typeDefs  :graphql query 및 mutation의 schema definition에 관한 정보
const typeDefs = fs.readFileSync('./schema.graphql',{ encoding:'utf-8' })

// respose를 처리하는 resolver. typeDef에서 정의한 query 및 mutation의 실제 구현
const resolvers = require('./resolver')

// graphql-tools : schema 와 resovler를 분리시켜주는 패키지
const {makeExecutableSchema} = require('graphql-tools')
const schema = makeExecutableSchema({typeDefs, resolvers})

app.use(cors(), bodyParser.json())

// const { graphiqlExpress,graphqlExpress } = require('apollo-server-express')
// app.use('/graphql',graphqlExpress({schema}))
// app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}))
SERVER.applyMiddleware({
    app: express
})

// port번호 같은 부분은 process.env로 관리하는 게 좋습니다.
app.listen(
    port, 
    () => {
        console.log(`server starts on port ${port}`)
    }
)
