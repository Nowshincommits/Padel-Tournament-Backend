// m2 class 2

import { prop, pre } from "@typegoose/typegoose";
import  argon2  from 'argon2'


// some hashes the password and sends it
// we will use a preset. We will send the password as plain text
// we can run an operation in preset before saving
// async function
@pre<User>('save', async function() {

  if(!this.isModified('password')){
    return 
  }

    if(this.password){
      const hash = await argon2.hash(this.password)
      this.password = hash
    }
})



// schema will be the plural of the class e.g.Users
export class User {
  //    prop type
  @prop({ type: String, required: true, maxlength: 3 })
  //   ! means required field
  firstName!: string
  @prop({ type: String })
  lastName!: string

  @prop({ type: String })
  fullName!: string

  @prop({ type: String, unique: true })
  username!: string

  @prop({ type: String, required: true, unique: true })
  email!: string

  @prop({ type: String, required: false })
  phone!: string

  @prop({ type: String, required: false })
  profileImage!: string

  @prop({ type: String, required: false })
  bio!: string
  //  password will not be stored as plain text . We will do hashing
  @prop({ type: String, required: true })
  password!: string
  // enumeration(enum): searching from the dictionary
  @prop({ type: String, required: true, enum: ['user', 'admin'] })
  role!: 'user' | 'admin'

  @prop({ type: Boolean, required: true, default: false })
  isVerify!: boolean
}