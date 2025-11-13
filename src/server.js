import express from 'express'

const app = express()
const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
    console.log(`server run on port :${PORT}`);
})
