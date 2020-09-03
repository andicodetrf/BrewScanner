const router = require('express').Router();
require('dotenv').config()
const checkToken = require("../config/config")
const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// const key =  process.env.SECRET

/*
@route Post api/auth/register
@desc register user
@access public
*/
router.post('/register', async(req,res) => {
    let {fullName, birthDate, address, email, password} = req.body

    try{
        
        let user = new User({fullName, birthDate, address, email}) 

        //hash password before save
        let hashPassword = await bcrypt.hash(password, 10)

        user.password = hashPassword;

        await user.save(); //save user!


            const payload = {
                user: {
                    id: user._id
                }
            }

            jwt.sign(
                payload, 
                process.env.SECRET, 
                {expiresIn: 360000000}, 
                (err, token) => {
                    if(err) throw err
                
                    res.status(200).json({
                        message: 'user registered successfully with token',
                        token});
                }
            );

    }catch(err) {

        res.status(500).json({
            message: 'Unable to Register. All fields must be completed'
        })
    }
})


/*
@route POST api/auth/login
@desc register user
@access public
*/
router.post('/login', async(req,res) => {
    let {email, password} = req.body
    try{

        //STEP1
        //search DB for user with email
        let user = await User.findOne({email: email})

        //if cant find the user, then 
        if(!user){
            return res.status(400).json({
                message: "Please enter log in details"
            })
        }

        // debug
        // console.log(password)
        // console.log(user.password)

        //STEP2
        //if found, now verify if the user entered a password that match the one in DB.
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: 'Incorrect Email or Password'
            })
        }


        //STEP3 (payload is the data you send back?) EBERE:IMPORTANT DONT SEND ALL THE USER INFO TO THE USER. JUST SEND THE ID!!
        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload, 
            process.env.SECRET, 
            // "sei23fewdaystogo",
            {expiresIn: 360000000}, 
            (err, token) => {
                if(err) throw err
            
                res.status(200).json({token});
            }
        );

    }catch(err) {
        // console.log(err)
        res.status(500).json({
            message: 'Error: 500'
        });
    }
    
})


// router.get('/user', checkToken, async(req,res) => {
//     //you have the req.user already so now req.user
//     try{
//         // let foundUser = await User.findById(req.user.id)
//         let foundUser = await User.findById(req.user.id, "-password")

//         // let user = {
//         //     firstname: foundUser.firstname,
//         //     lastname: foundUser.lastname,
//         //     email: foundUser.email,
//         // }

//         res.status(200).json({
//             message: 'user found',
//             // user,
//             foundUser,
//         })

//     }catch(error){

//         res.status(500).json({
//             message: 'smth wrong',
            
//         })


//     }
// })


//GET USER
router.get("/user", checkToken, async (req, res) => {
    try {
      let user = await User.findById(req.user.id, "-password");
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "something is wrong!",
      });
    }
  });

//EDIT USER ADDRESS ONLY
router.put("/user", checkToken, async (req, res) => {
    try {
    let {address} = req.body
    console.log(address)

      let user = await User.findByIdAndUpdate(req.user.id, {address});
    
        if(user){
            console.log(user)
            res.status(200).json({
            user,
        });
        }
    } catch (error) {
        console.log(error)
      res.status(500).json({
        message: "unable to update!",
      });
    }
  });




module.exports = router;

