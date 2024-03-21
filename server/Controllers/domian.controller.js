import { Domain } from "../Models/domain.model.js";

//CREATE 

export const addDomain = async (req, res, next) => {
  try {
    const { domainName, records } = req.body;
    const newDomain = new Domain({ domainName, records });
    const savedDomain = await newDomain.save();
    res.json({ message: "Domain created successfully!", domain: savedDomain });
  } catch (error) {
    next(error);
  }
};

//READ/GET ALL
export const getDomains = async (req, res, next) => {
  try {
    const domains = await Domain.find({});
    res.json(domains);
  } catch (error) {
    next(error);
  }
};

//FILTER & SEARCH
export const getDomainFiltering = async (req, res, next) => {
    try {
        const { domainName, recordType } = req.query; 
      
        const query = {};
        if (domainName) {
          query.domainName = new RegExp(domainName, "i"); 
        }
        if (recordType) {
          query.records.recordType = recordType;
        }
      
        const filteredDomains = await Domain.find(query);
      
        res.json(filteredDomains);
        
    } catch (error) {
        next(error)
    }
 
};

// UPDATE
export const updateDomain = async(req,res,next) =>{
try {
    const domainId = req.params.id; 
    const updates = req.body; 

    const updatedDomain = await Domain.findByIdAndUpdate(domainId, updates, { new: true }); 
    if (!updatedDomain) {
      return res.status(404).json({ message: 'Domain not found' }); 
    }

    res.json(updatedDomain);
    
} catch (error) {
    next(error)
}
}
//DELETE
export const deleteDomain = async(req,res,next) =>{
    try {
        const domainId = req.params.id;
        const deletedDomain = await Domain.findByIdAndDelete(domainId)
        if (!deletedDomain) {
            return res.status(404).json({ message: 'Domain not found' }); // Handle non-existent domain
          }
      
          res.json({ message: 'Domain deleted successfully' });
    
    } catch (error) {
    next(error)
        
    }
}
