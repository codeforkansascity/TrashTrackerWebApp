import { useState } from "react";

const Filters = ({filterByDate, filterByCategory}) => {
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const [openCategoryFilter, setOpenCategoryFilter] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [defaultDateValue, setDefaultDateValue] = useState(false);
  const [defaultCategoryValue, setDefaultCategoryValue] = useState("select");

  // Close all filters when the "close" button is clicked
  const closeFilters = () => {
    setOpenFilters(false);
    setOpenCategoryFilter(false);
    setOpenDateFilter(false);
    filterByDate("close");
  };

  // When "Date Filter" button is clicked, close category filter, open date filter, remove the button group for selection
  const openDateFilterFunction = () => {
    setOpenCategoryFilter(false);
    setOpenDateFilter(true);
    setOpenFilters(false);
  };

  // When "Category Filter" button is clicked, close date filter, open category filter, remove the button group for selection
  const openCategoryFilterFunction = () => {
    setOpenDateFilter(false);
    setOpenCategoryFilter(true);
    setOpenFilters(false);
  };

  const handleDateChange = (value) => {
    filterByDate(value);
    setDefaultDateValue(value);
  }

  const handleCategoryChange = (value) => {
    filterByCategory(value);
    setDefaultCategoryValue(value);
  }

  const DateFilter = () => {
    return (
      <div className="col-6 mt-2 mb-5 mx-auto">
        <label htmlFor="select" className="form-label">Date Filter</label>
        <select className="form-select form-select-lg mb-3" id="select" value={defaultDateValue} aria-label=".form-select-lg example" onChange={(e) => handleDateChange(e.target.value)}>
          <option value="false">All Months</option>
          <option value="0">Current Month</option>
          <option value="1">1 Month Ago</option>
          <option value="2">2 Months Ago</option>
          <option value="3">3 Months Ago</option>
        </select>
    </div>
    )
  }

  const CategoryFilter = () => {
    return (
      <div className="col-6 mt-2 mb-5 mx-auto">
        <label htmlFor="select" className="form-label">Category Filter</label>
        <select value={defaultCategoryValue} className="form-select form-select-lg mb-3" aria-label="Default select example" onChange={(e) => handleCategoryChange(e.target.value)} >
          <option value="select">Select</option>
          <option value="Tires">Tires</option>
          <option value="Leaves & Brushes">Leaves & Brushes</option>
          <option value="Bulky Items">Bulky Items</option>
          <option value="Clean Up Site">Clean Up Site</option>
        </select>
      </div>
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-end mb-5">
        { openFilters ?
          <button onClick={closeFilters} className="btn btn-sm btn-danger">Close</button>
          :
          <button onClick={() => setOpenFilters(!openFilters)} className="btn btn-sm" style={{"backgroundColor":"white"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
            </svg> Filter
          </button>
        }
      </div>

      { openFilters ?
        <div className="d-grid gap-2 w-75 mx-auto my-5">
          <button className="btn btn-secondary" type="button" onClick={openDateFilterFunction}>Date Filter</button>
          <button className="btn btn-secondary" type="button" onClick={openCategoryFilterFunction}>Category Filter</button>
        </div>
        :
        ""
      }

      { openDateFilter ? <DateFilter /> : ""}
      { openCategoryFilter ? <CategoryFilter /> : ""}
    </div>
  )

}

export default Filters;