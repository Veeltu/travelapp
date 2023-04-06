  // check if country name from rest country api is same as target country name from map api
  export const checkDifrences = (nameCountry) => {
    // index is important !
    const mapNameDifrences = [
      "United States of America",
      "Democratic Republic of the Congo",
    ];
    const restCountriesDifrence = ["United States", "Republic of the Congo"];
    // check if nameCountry is in mapNameDifrences
    if (mapNameDifrences.includes(nameCountry)) {
      // get the corresponding index of the nameCountry in mapNameDifrences
      const targetIndex = mapNameDifrences.indexOf(nameCountry);
      // update nameCountry to the corresponding country in restCountriesDifrence
      nameCountry = restCountriesDifrence[targetIndex];
    }
    return nameCountry;
  };