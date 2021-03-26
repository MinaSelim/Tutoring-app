import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import React from 'react';

const Search = (items): JSX.Element => {
  console.log(items.items);
  //temporary
  items = [
    {title: 'Star Wars'},
    {title: 'Back to the Future'},
    {title: 'The Matrix'},
    {title: 'Inception'},
    {title: 'Interstellar'},
  ];
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(items);

  const onSelect = (index): void => {
    setValue(items[index].title);
  };

  const onChangeText = (query): void => {
    setValue(query);
    setData(
      items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const ResultList = (): JSX.Element => {
    if (data !== undefined) {
      return data.map((item, index) => (
        <AutocompleteItem key={index} title={item.title} />
      ));
    } else {
      return <AutocompleteItem key={'title'} title={'No Data'} />;
    }
  };

  //change listlength for class
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
