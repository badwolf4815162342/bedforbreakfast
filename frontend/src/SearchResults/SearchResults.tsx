import { Checkbox } from '@material-ui/core';
import React from 'react';
import {
  ApplyButton,
  FilterArea,
  FilterHeader,
  HasRatingsArea,
  IsVerifiedArea,
  ResetButton,
  ResultContainer,
  Results,
  SelectContainer,
  Space,
  StyledSearchResultCard,
  Title,
} from './SearchResultsStyle';

interface SearchResultsProps {
  accommodations: Accommodation[];
  city: string;
}
interface SearchResultsState {
  hasRatings: boolean;
  isVerified: boolean;
  gender: string;
  isLoaded: boolean;
  applied: boolean;
  accommodations: Accommodation[];
  districts: string[];
}

export interface User {
  firstName: string;
  lastName: string;
  description: string;
  favoriteFood: string;
  homeTown: string;
  homeCountry: string;
  profilePicture: string;
}

export interface Accommodation {
  _id: string;
  isActive: boolean;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  zipCode: string;
  description: string;
  district: string;
  numberOfBeds: number;
  pictures: [string];
  user: User;
}

export class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasRatings: false,
      isVerified: false,
      gender: 'a',
      isLoaded: false,
      applied: false,
      accommodations: props.accommodations,
      districts: this.getDistricts(),
    };
    console.log(this.state.districts);
  }

  getDistricts() {
    return Array.from(new Set(this.props.accommodations.map((i) => i.district)));
  }

  apply() {
    const newList = this.state.accommodations.filter(
      (accommodation: Accommodation) => accommodation.zipCode === '8923',
    );
    this.setState({ accommodations: newList, applied: true });
  }

  reset() {
    this.setState({ accommodations: this.props.accommodations, applied: false });
  }

  render() {
    return (
      <Results>
        <Title>Results for {this.props.city}</Title>
        <FilterArea>
          <FilterHeader>Filter</FilterHeader>
          <HasRatingsArea>
            Host has Ratings:
            <Checkbox
              checked={this.state.hasRatings}
              onChange={(e) => this.setState({ hasRatings: e.target.checked })}
              value="hasRatings"
              color="primary"
            />
          </HasRatingsArea>
          <IsVerifiedArea>
            Host is Verified:
            <Checkbox
              checked={this.state.isVerified}
              onChange={(e) => this.setState({ isVerified: e.target.checked })}
              value="isVerified"
              color="primary"
            />
          </IsVerifiedArea>
          <SelectContainer>
            Gender:
            <select onChange={(e) => this.setState({ gender: e.target.value })}>
              <option value="a">Any</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="d">Diverse</option>
            </select>
          </SelectContainer>
          <ApplyButton
            variant="contained"
            color="secondary"
            onClick={() => {
              this.apply();
            }}
          >
            Apply
          </ApplyButton>
          {this.state.applied && (
            <ResetButton
              color="secondary"
              onClick={() => {
                this.reset();
              }}
            >
              Reset Filter
            </ResetButton>
          )}
        </FilterArea>
        <ResultContainer>
          {this.state.accommodations &&
            this.state.accommodations.map((accommodation) => (
              <div key={accommodation._id}>
                <StyledSearchResultCard accommodation={accommodation} />
                <Space />
              </div>
            ))}
        </ResultContainer>
      </Results>
    );
  }
}
