# AbbreviationAutocompleteReact
An autocomplete for abbreviations/acronyms searching by description rather than the abbreviation text.

![autocomplete_screenshot](https://raw.githubusercontent.com/FireLemons/DocumentationMaterials/main/img/abbreviation-autocomplete-react.png)
### [Live Example](https://firelemons.github.io/AutocompleteExample/react/)

## Props
##### data
The autocomplete search data

The options are an array of objects in the form

    {
      a: "Abbreviation or Acronym",
      d: "Definition or Description"
    }

e.g.

    [
      {
        "a":"ICY",
        "d":"Icy Bay Airport"
      },
      {
        "a":"HGZ",
        "d":"Hog River Airport"
      }
    ]

##### limit(Optional)
The autocomplete results limit  
`Infinity` by default
##### min-search-text-length(Optional)
The minimum number of characters typed before autocomplete results are displayed  
1 by default
##### placeholder(Optional)
Placeholder text for the search text input

#### Functions  
##### onSearchTextChange
Triggered whenever the search text changes
Emits the text of the autocomplete search

##### onSelect
Triggered after selecting an option in the dropdown  
Emits the object representing the option selected
