import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { SearchIconWrapper, Search, StyledInputBase } from './searchComponents';

interface SearchNameEmailProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchNameEmail: React.FC<SearchNameEmailProps> = ({ setSearchTerm }) => {
  // Event handler for handling changes in the search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the search term state based on the input value
    setSearchTerm(event.target.value);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search… by name/email"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchChange}
      />
    </Search>
  );
};

export default SearchNameEmail;
