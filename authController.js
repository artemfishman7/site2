const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
class authController {
    async registration(req, res) {
        try{
            const {username, password} = req.body
            const candidate = User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
        } catch (e)  {
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try{
            res.json("server work")

        } catch (e){
            res.status(400).json({message: "login error"})
        }
    }

    async getUsers(req, res) {

        try{
            const userRole = new Role()
            const adminRole = new Role({value: "ADMIN"})
            await userRole.save()
            await adminRole.save()
            res.json("server work")
        } catch (e){

        }
    }
}

module.exports = new authController()
