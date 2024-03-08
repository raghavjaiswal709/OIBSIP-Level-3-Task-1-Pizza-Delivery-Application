import mongoose from "mongoose";
import {authOptions} from '../auth/[...nextauth]/route.js'
import { getServerSession } from "next-auth";
import { User } from '../../models/User.js'

export async function PUT(req){
    mongoose.connect(process.env.MONGO_URL);
    const data= await req.json();
    const session = await getServerSession(authOptions);
    // console.log({session, data});
    const email = session.user.email;
    // const user = await User.findOne({email})

    if('name' in data){
        await User.updateOne({email},{name:data.name});
    }
    return Response.json(true)
}

