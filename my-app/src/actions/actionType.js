const createConstants = (...constants) => {
  let types = {};
  for(let type of constants){
    types[type] = type;
  }
  return types;
};

export default createConstants(

)