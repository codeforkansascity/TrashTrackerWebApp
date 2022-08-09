import React from 'react';
import './Datafilter.css';

const Datafilter = () => {
    return (
        <section id="search">
            <div class="container">
                <div class="row">
                    <div class="col-3">
                    </div>
                    <div class="col-6">
                        <label for="formGroupExampleInput" class="form-label">Date Filters</label>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            <option selected>Past 30 Days</option>
                            <option value="1">Past 2 Months</option>
                            <option value="2">Past 3 Months</option>
                            <option value="3">Past 4 Months</option>
                            <option value="4">Past 5 Months</option>
                            <option value="5">Past 6 Months</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Datafilter;