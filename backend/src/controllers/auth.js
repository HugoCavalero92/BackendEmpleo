const { response } = require("express");
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const {generateJwt} = require('../helpers/jwt');

const loginUser = async (req, res = response) => {

    const {email, password } = req.body;
    try{
        // Verify email

        const dbUser = await User.findOne({email});
        
        if(!dbUser){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario o contraseña invalido'
            });
        }

        // Verify the password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña invalida'
            });
        }

        // Generate a jwt
        const token = await generateJwt(dbUser._id);

        res.json({
            ok: true,
            token,
            user: dbUser
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        })
    }
}


const renewToken = async (req, res=response) => {

    const uid = req.uid;

    const token = await generateJwt(uid);
    const dbUser = await User.findById(uid);
    res.json({
        ok: true,
        token,
        user: dbUser
    })

}

module.exports = {
    loginUser,
    renewToken
};