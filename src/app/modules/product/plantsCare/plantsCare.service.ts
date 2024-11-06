import PlantCare from "./plantsCare.model";

const getPlantsCareFromDb = async () => {
    const result = await PlantCare.find()
    return result;
  };


  export const PlantsCareServices = {
 
    getPlantsCareFromDb
  };