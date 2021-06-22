import { Document, Schema, model} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email:string;
    password: string;

}


 const ContactSchema: Schema = new Schema ({
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        required : true,
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required: true
    },
    created_date:{
        type: Date,
        default: Date.now
    }
})


export default model<IUser>('Contact',ContactSchema)


