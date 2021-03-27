import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import React from 'react';

const Search = (items): JSX.Element => {
  if (items.items === undefined) {
    items = [{title: 'No Data'}];
  } else items = items.items;
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(items);

  const onSelect = (index): void => {
    console.log('!!!');
    setValue(data[index].title);
  };

  const onChangeText = (query): void => {
    console.log('!!!');
    setValue(query);
    setData(
      items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const ResultList = (): JSX.Element => {
    return data.map((item, index) => (
      <AutocompleteItem key={index} title={item.title} />
    ));
  };

  return (
    <Autocomplete
      placeholder="Select a campus"
      placement="bottom start"
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}>
      <ResultList />
    </Autocomplete>
  );
};

export default Search;
