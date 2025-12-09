import mongoose,{Document,Schema} from 'mongoose'


export interface IStudent extends Document{
    name: string;
    dob: Date;
    class: string;
    rollNo: number;
    phone: number;
}


const studentSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        class: {
            type: String,
            required: true
        },
        rollNo: {
            type: Number,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }

    }
)

const Student = mongoose.model<IStudent>('Student',studentSchema)
export default Student
