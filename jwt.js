const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //first check authorization
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({message: 'Token not found'});
    //extract jwt token from header

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    try {
        //verify token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user information to the object
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Invalid token' });
    }
}

//func for generate token
const generateToken = (userData) =>{
    //generate a newjwt
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};