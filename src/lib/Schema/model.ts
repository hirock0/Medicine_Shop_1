import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    name:{type: String, ref: "name", required:[true, 'Name is required']},
    email:{type: String, unique:true, ref: "email", required:[true, 'Email is required']},
    username:{type: String, ref: "username", required: [true, 'Username is required']},
    password:{type: String, ref: "password", required:[true, 'Password is required']},
    user_terms:{type: String, ref: "user_terms", required:false},
    userImageUrl:{type: String, ref: "userImage", required:[true, 'User Image Url is required']},
    image_public_id:{type: String, ref: "image_public_id", required:[true, 'Public Id is required']},
    address:{
        village:{type: String, ref: "village", required:false},
        thana:{type: String, ref: "thana", required:false},
        district:{type: String, ref: "district", required:false},
        country:{type: String, ref: "country", required: false}
    },
    contact:{type: String, ref: "contact", required:false},
    total_buy_medicine:[],
    recentDate: { type: String, ref: "userImg", required:false},
    isVerify: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: String,
    tokenVerified: Date,
    forgotPassword: String,
    forgotPasswordVerified: Date,
    dateField: {
      type: Date,
      default: Date.now,
      required: false,
    },


},
    {
    timestamps: false,
    
  }
)

export const userSchemaStr = mongoose.models.users || mongoose.model("users", userSchema);





const medicineData = new mongoose.Schema({
    medicineName: { type: String, ref: "medicineName", required: [true, 'Medicine Name is required'] },
    medicinePotency: { type: String, ref: "medicinePotency", required: [true, 'Medicine Potency is required'] },
    medicinePrice: { type: String, ref: "medicinePrice", required: [true, 'Medicine Price is required'] },
    madeIn: { type: String, ref: "madeIn", required: [true, 'MadeIn is required']},
    medicineImage: { type: String, ref: "medicineImage", required:[true, 'Medicine Image is required'] },
    recentDate:{type: String, ref: "recentDate", required: [true, ' Recent Date is required']},
    descriptions:{type: String, ref: "descriptions", required:[true, 'Descriptions  is required']},
    effect:{type: String, ref: "effect", required: [true, 'Effect  is required']},
    sideEffect:{type: String, ref: "sideEffect", required: [true, 'Side Effect is required']},
    doses:{type: String, ref: "doses", required: [true, 'Doses  is required']},
    category:{type: String, ref: "category", required: [true, 'Category  is required']},
    dilution:{type: String, ref: "dilution", required: [true, 'Dilution  is required']},
    likes:[],
    comments:[],
    image_public_id:{type: String, ref: "image_public_id", required: [true, 'Public Id is required']},
    dateField:{
        type:Date,
        default:Date.now,
        required: false,

    },

})

export const allMedicines = mongoose.models.medicines || mongoose.model("medicines", medicineData);


