// this file contains the code for the advanced search modal component
import React from 'react';

export default class AdvancedSearchModal extends React.Component {
  render() {
    return (
        <div className="advanced-search-modal">
            <h1>Advanced Search</h1>
            <form>
                <input type="text" placeholder="Search..." />
                <button>Search</button>
            </form>
        </div>
    );
  }
}