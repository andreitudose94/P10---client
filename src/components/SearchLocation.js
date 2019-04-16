import React, {Component} from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';

class SearchLocation extends React.Component {

  renderFunc({ getInputProps, getSuggestionItemProps, loading, suggestions }) {
    return (
      <div className="autocomplete-root">
        <input {...getInputProps({className: 'autocompleteInput'})} />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
            return (
              <div
                {...getSuggestionItemProps(suggestion, {className})}>
                <span>{suggestion.description}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  };

  render() {
    const { value, onChange, onSelect } = this.props
    return (
      <PlacesAutocomplete
        value={value}
        onChange={(val) => onChange(val)}
        onSelect={(val) => onSelect(val)}
      >
        {this.renderFunc}
      </PlacesAutocomplete>
    )
  }
}

export default SearchLocation
