import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const fetchJokes = async (query) => {
  const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  return response.data;
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { query } = router.query;

  const { data, error, isLoading } = useQuery({
    queryKey: ['jokes', query],
    queryFn: () => fetchJokes(query),
    enabled: query && query.length >= 4,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length >= 4) {
      router.push(`/search?query=${value}`);
    } else if (value.length === 0) {
      router.push(`/search`);
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search jokes..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      {isLoading && (
        <div className="grid-container skeleton-grid">
          <div className="card skeleton-card"></div>
          <div className="card skeleton-card"></div>
          <div className="card skeleton-card"></div>
          <div className="card skeleton-card"></div>
        </div>
      )}

      {error && <p>Error loading jokes</p>}

      {data && data.total === 0 && searchTerm.length > 0 && !isLoading && (
        <p>No jokes here</p>
      )}

      {data && data.total > 0 && !isLoading && (
        <>
          <p>Total count: {data.total}</p>
          <div className="grid-container">
            {data.result.map((joke) => (
              <div key={joke.id} className="card">
                <p className="card-text">{joke.value}</p>
                <p className="card-id">
                  <small>ID: {joke.id}</small>
                </p>
                <p className="card-updated">
                  <small>{new Date(joke.updated_at).toLocaleString()}</small>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
