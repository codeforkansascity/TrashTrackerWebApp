import { useEffect, useState } from "react";

const DataCategory = ( { category, updateCategoryinDatabase } ) => {
  const [selectedCategory, setSelectedCategory] = useState("select");

  useEffect(()=>{
    switch (category) {
      case "Tires": setSelectedCategory("Tires"); break;
      case "Leaves & Brushes": setSelectedCategory("Leaves & Brushes"); break;
      case "Bulky Items": setSelectedCategory("Bulky Items"); break;
      case "Clean Up Site": setSelectedCategory("Clean Up Site"); break;
      default: setSelectedCategory("select");
    }
  },[]);

  const handleSelect = (value) => {
    setSelectedCategory(value);
    updateCategoryinDatabase(value);
  }

  return (
    <select value={selectedCategory} className="form-select" aria-label="Default select example" onChange={(e) => handleSelect(e.target.value)} >
      <option value="select">Select</option>
      <option value="Tires">Tires</option>
      <option value="Leaves & Brushes">Leaves & Brushes</option>
      <option value="Bulky Items">Bulky Items</option>
      <option value="Clean Up Site">Clean Up Site</option>
    </select>
  )
}

export default DataCategory;