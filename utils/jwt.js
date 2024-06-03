// get jsonwebtoken library
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if( !JWT_SECRET ){
    throw new error("Please add jwt secret key in .env file");
}

export const generateToken = ( user ) => {
    return jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: '1d',
    });
}

export const verifyToken = ( token ) => {
    return jwt.verify(token, JWT_SECRET);
};


