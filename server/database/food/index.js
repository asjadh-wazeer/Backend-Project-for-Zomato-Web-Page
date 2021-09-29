import mongoose from "mongoose";

const FoodScheme = new mongoose.Schema ({
    name: {name: String, required: true},
    description: {name: String, required: true},
    isVeg: {type: Boolean, required:true},
    isContainsEgg: {type: Boolean, required:true},
    category: {name: String, required: true},
    photos: {
        type: mongoose.Types.ObjectId,
        ref: "Images"
    },
    price: {type: Number, default:150, required:true},
    addOns: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Foods"
        }
    ],
    restaurant: {
            type: mongoose.Types.ObjectId,
            ref: "Restaurants",
            required: true
    }

},
{timestamps: true}
)

export const FoodModel = mongoose.model("Foods", FoodSchema);