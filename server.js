import express from 'express'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())


async function main(){

}

main()
    .catch(async(e) => {
      console.error(e)
      process.exit(1)  
    })
    .finally(async() => {
        await prisma.$disconnect()
    })

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,

        }
    })

    res.status(201).json(req.body)
})

app.get('/users', async (req,res) => {

    let users = []

    if(req.query){
        users = await prisma.users.findMany({
            where:{
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    } else {
    
    users = await prisma.user.findMany()

    }

    res.status(200).json(users)

})

app.put('/users/:id', async (req, res) => {
    await prisma.user.update({
        
        where: {
        id: req.params.id
    },

    data: {
        email: req.body.email,
        age: req.body.age,
        name: req.body.name
    }
    
    })

    res.status(201).json(req.body)
})

app.delete("/users/:id", async (req,res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "user deleted! "})
})

app.listen(3000)
