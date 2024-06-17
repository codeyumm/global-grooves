import connectDatabse from '../../../utils/db';
import User from '../../../models/user';
import bcrypt from 'bcryptjs';

export default async function handler( req, res ) {
    await connectDatabse();

    const { name, username, email, password } = req.body;

    try{

        const isExistingUser = await User.findOne( { email });

        if( isExistingUser ){
            return res.status(400).json( { message: "Email already in use"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch( error ) {
        res.status(500).json( { message: "Internal Server Error"});
    }

}
