import mongoose from "mongoose";

const DomainSchema = new mongoose.Schema({
    domainName: {
      type: String,
      required: true,
      unique: true
    },
    records: [{
      recordType: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      TTL: {
        type: Number,
        default: 3600 
      }
    }]
  }
  ,{timestamps:true});
  
export const Domain = mongoose.model("Domain",DomainSchema);
  