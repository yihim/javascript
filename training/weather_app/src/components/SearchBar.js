import React from "react";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchBar = ({ setLoc }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setLoc({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
        types: "address",
      }}
      styles={{
        container: {
          position: "absolute",
          width: "70%",
          zIndex: 1,
          borderRadius: 15,
          top: 60,
        },
        textInputContainer: {
          borderRadius: 15,
          shadowColor: "#67656e",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
        },
        listView: {
          borderRadius: 15,
        },
      }}
    />
  );
};

export default SearchBar;
