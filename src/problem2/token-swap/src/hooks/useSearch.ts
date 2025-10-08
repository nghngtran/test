import { useState, useMemo, useRef } from "react";

interface UseSearchProps<T> {
  options: T[];
  searchKey: keyof T;
}

export function useSearch<T>({ options, searchKey }: UseSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;

    return options.filter((option) => {
      const searchValue = String(option[searchKey]).toLowerCase();
      return searchValue.includes(searchTerm.toLowerCase());
    });
  }, [options, searchTerm, searchKey]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const focusSearch = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  const handleSearchFocus = () => {
    focusSearch();
  };

  return {
    searchTerm,
    searchRef,
    filteredOptions,
    handleSearchChange,
    clearSearch,
    focusSearch,
    handleSearchFocus,
    hasResults: filteredOptions.length > 0,
  };
}
