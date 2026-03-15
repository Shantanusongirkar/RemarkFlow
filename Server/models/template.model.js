import mongoose from "mongoose";

const templateSchema = new mongoose.Schema ({
   name: { type: String,
          required: true,},
   content: {
    type: String,
          required: true,
   }
});

const template = mongoose.model("template" , templateSchema);
export default template;