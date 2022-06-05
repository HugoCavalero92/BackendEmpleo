const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJwt } = require('../helpers/jwt');


const getUsers = async (req, res) => {
    const from = Number(req.query.from) || 0;

    const [users, total ]= await Promise.all([
         User.find({}, 'name email img')
        .skip(from)
        .limit(10),
        User.count()
    ])
    res.json({
        ok: true,
        users,
        uid: req.uid,
        total
    })
};

const createUser = async (req, res = response) => {
    const {email, password} = req.body;
    try{

        const emailExists = await User.findOne({email});
        if(emailExists) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya esta registrado'
            })
        }

        const user = new User( req.body );

        // Encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user with encrypted password
        await user.save();
    
        // Generate the jwt
        const token = await generateJwt(user._id);
        res.json({
            ok: true,
            user,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try{
        const dbUser = await User.findById(uid);

        if(!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un usuario con ese id'
            });
        }
        
        // Update user
        const {password, email, ...fields} = req.body;

        // Verify if the user update his email too
        if(dbUser.email !== email){
            const emailExists = await User.findOne({ email});
            if(emailExists){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        fields.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});
    
        res.json({
            ok: true,
            updatedUser
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const deleteUser = async (req, res = response) => {

    const uid = req.params.id;

    try{
        const deletedUser = await User.findByIdAndDelete(uid);

        if(!deletedUser) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro un usuario con ese id'
            });
        }
    
        res.json({
            ok: true,
            deletedUser
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};