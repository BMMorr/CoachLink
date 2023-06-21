import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CoachingJobCard from '../CoachingJobCard/CoachingJobCard';
import FilterButton from '../FilterButton/FilterButton';
import "./CoachingCardList.css"
// FILTER BOILERPLATE START: 
// Outside of the function, define some constants
// (this is so it doesn't recalculate every time CoachingJobList component
// is re-rendered. It is going to be constant!) 
// First, create an object to map the filter options:
const FILTER_MAP = {
	All: () => true,
	Ski: (gig) => gig.ski_or_snow === "Ski",
	Snowboard: (gig) => gig.ski_or_snow === "Snowboard"
}
// Then use Object.keys() method to collect an array of the filter names:
const FILTER_NAMES = Object.keys(FILTER_MAP); // FILTER BOILERPLATE END
 
function CoachingJobList() {
	const dispatch = useDispatch();
	const gigs = useSelector((store) => store.gigs);
	// console.log(gigs);

	const [filter, setFilter] = useState("All");
	// need to filter thru the list of filter options/names:
	const filterList = FILTER_NAMES.map((name) => (
		<FilterButton
			key={name}
			name={name}
			isPressed={name === filter}
			setFilter={setFilter}
		/>
	));

	//this starts the dispatch to begin our flow - this will reload our side effect whenever the dispatch is changed
	useEffect(() => {
		dispatch({ type: 'FETCH_GIGS' });
	}, [dispatch]);

	// need to convert the DB format of date to something more readable:
	function convertDateFormat(date) {
		const dateObj = new Date(date);
		return dateObj.toDateString();
	}

	return (
		<>
			<h1>Avaliable Gigs</h1>
			<div className="filter-container">
				<h2 className="filter-child">Search Filters:</h2>
				<span className="filter-child">{filterList}</span>
			</div>

			<div className='cardContainer'>
				{gigs
					.filter(FILTER_MAP[filter])
					.map((gig, index) => {
						return (
							<CoachingJobCard
								id={gig.id}
								key={index}
								gig={gig}
								convertDateFormat={convertDateFormat}
							/>
						)
					})}
			</div>
		</>
	);
}

export default CoachingJobList;