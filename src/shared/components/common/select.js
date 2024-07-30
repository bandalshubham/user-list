import React from "react";

const UserSelect = ({ usercountry,valuekey,handleSelect,selectedValue }) => {
    const getNestedValue = (obj, key) => {
        const parts = key.split('.');
        for (let i = 0; i < parts.length; i++) {
          obj = obj[parts[i]];
          if (obj === undefined) {
            return undefined;
          }
        }
      
        return obj;
      };

      // Utility function to filter unique options
const filterUniqueOptions = (options, valueKey) => {
  const uniqueValues = new Set();
  return options.filter(option => {
    const value = getNestedValue(option, valueKey);
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      return true;
    }
    return false;
  });
};

  const uniqueOptions = filterUniqueOptions(usercountry, valuekey);


  return (
    <>
      <select value={selectedValue} onChange={handleSelect} >
        {uniqueOptions.map((option, index) => (
          <option key={index} value={getNestedValue(option, valuekey)}>
             {getNestedValue(option, valuekey)}
          </option>
        ))}
      </select>
    </>
  );
};

export default UserSelect;
