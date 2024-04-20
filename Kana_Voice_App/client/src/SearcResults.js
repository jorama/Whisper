import React from 'react';

function SearchResults({ venues }) {
    if (!venues || venues.length === 0) {
        return <p>No results found.</p>;
    }

    return (
        <ul>
            {venues.map(venue => (
                <li key={venue.id}>
                    {venue.name} - {venue.location.address}
                </li>
            ))}
        </ul>
    );
}

export default SearchResults;
