import mongoose from "mongoose"

const medicineData = new mongoose.Schema({
    medicineName: { type: String, ref: "medicineName", required: false },
    medicinePotency: { type: String, ref: "medicinePotency", required: false },
    medicinePrice: { type: String, ref: "medicinePrice", required: false },
    madeIn: { type: String, ref: "madeIn", required: false },
    medicineImage: { type: String, ref: "medicineImage", required: false },
    recentDate:{type: String, ref: "recentDate", required: false},
    descriptions:{type: String, ref: "descriptions", required: false},
    effect:{type: String, ref: "effect", required: false},
    sideEffect:{type: String, ref: "sideEffect", required: false},
    doses:{type: String, ref: "doses", required: false},
    category:{type: String, ref: "category", required: false},
    dilution:{type: String, ref: "dilution", required: false},
    likes:[],
    comments:[],
    image_public_id:{type: String, ref: "image_public_id", required: false},
    dateField:{
        type:Date,
        default:Date.now
    },

})

export const allMedicines = mongoose.models.medicines || mongoose.model("medicines", medicineData);

