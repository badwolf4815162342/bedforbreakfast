import React from 'react';
import { Accommodation } from './LoadSearch';
import {
  ApplyButton,
  CheckboxRight,
  District,
  DistrictArea,
  DistrictCheckbox,
  DistrictName,
  Districts,
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
  districts: Array<{ val: string; flag: boolean }>;
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
  }

  onUpdateItem(i: number) {
    const newDistrict = this.state.districts;
    newDistrict.map((district, index) => {
      if (i === index) {
        district.flag = !district.flag;
      }
      return null;
    });
    this.setState({ districts: newDistrict });
  }

  getDistricts() {
    const districtArray = new Array<{ val: string; flag: boolean }>();
    const districtNames = Array.from(new Set(this.props.accommodations.map((i) => i.district)));
    districtNames.map((i) => districtArray.push({ val: i, flag: true }));
    return districtArray;
  }

  apply() {
    let newList: Accommodation[] = this.props.accommodations;
    if (this.state.hasRatings) {
      newList = newList.filter(
        (accommodation: Accommodation) =>
          !(accommodation.user.dislikedBy.length === 0 && accommodation.user.likedBy.length === 0),
      );
    }
    if (this.state.isVerified) {
      newList = newList.filter((accommodation: Accommodation) => accommodation.user.verified === true);
    }
    if (this.state.gender !== 'a') {
      newList = newList.filter((accommodation: Accommodation) => accommodation.user.gender === this.state.gender);
    }
    if (this.state.gender !== 'a') {
      newList = newList.filter((accommodation: Accommodation) => accommodation.user.gender === this.state.gender);
    }
    let districtList: Accommodation[] = [];
    this.state.districts.forEach((district) => {
      if (district.flag) {
        const tempList: Accommodation[] = newList.filter(
          (accommodation: Accommodation) => accommodation.district === district.val,
        );
        console.log(district.val);
        console.log(tempList);
        districtList = [...districtList, ...tempList];
        console.log(districtList);
      }
    });
    newList = districtList;
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
          <HasRatingsArea>Host has Ratings:</HasRatingsArea>
          <CheckboxRight
            checked={this.state.hasRatings}
            onChange={(e) => this.setState({ hasRatings: e.target.checked })}
            value="hasRatings"
            color="primary"
          />
          <IsVerifiedArea>Host is Verified:</IsVerifiedArea>
          <CheckboxRight
            checked={this.state.isVerified}
            onChange={(e) => this.setState({ isVerified: e.target.checked })}
            value="isVerified"
            color="primary"
          />
          <SelectContainer>
            Gender:
            <select onChange={(e) => this.setState({ gender: e.target.value })}>
              <option value="a">Any</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="d">Diverse</option>
            </select>
          </SelectContainer>
          <DistrictArea>
            <p>Districts:</p>
            <Districts>
              {this.state.districts &&
                this.state.districts.map((district, index) => (
                  <div key={district.val}>
                    <District>
                      <DistrictName>{district.val}</DistrictName>
                      <DistrictCheckbox
                        checked={district.flag}
                        onChange={(e) => this.onUpdateItem(index)}
                        value="{district.val}"
                        color="primary"
                      />
                    </District>
                  </div>
                ))}
            </Districts>
          </DistrictArea>
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
