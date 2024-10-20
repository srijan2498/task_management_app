import React from 'react'
import styles from '../styles/Home.module.css'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className={styles.searchBar}
    />
  )
}