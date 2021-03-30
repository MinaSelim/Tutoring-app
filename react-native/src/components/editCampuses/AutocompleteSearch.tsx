import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import DataFetcher from '../../api/search/Search';
import React, {useState, useMemo} from 'react';

interface IAutoCompleteSearch {
  category: string;
}

let fetched = false;
let items;

const AutocompleteSearch: React.FunctionComponent<IAutoCompleteSearch> = ({
  category,
}): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(items);

  const getData = async (): Promise<any> => {
    let rawItems;
    if (category === 'campuses') rawItems = await DataFetcher.getCampuses();
    else rawItems = await DataFetcher.getClasses(category);
    if (rawItems === undefined) items = [{title: 'No Data'}];
    // else {
    //   for (let i=0; i<rawItems) {
    //   }
    // }
    items = rawItems;
    setData(items);
    fetched = true;
    console.log(JSON.stringify('inside:' + data));
  };

  // React.useMemo(
  //   () =>
  //     getData(category).then((data) => {
  //       console.log(JSON.stringify('inside:' + data));
  //       items = data;
  //     }),
  //   [items],
  // );

  // getData(category).then((data) => {
  //   console.log(JSON.stringify('inside:' + data));
  //   items = data;
  // });
  if (!fetched) getData();

  console.log(JSON.stringify('outside:' + items));
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

  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item.title} />
  );

  return (
    <Autocomplete
      placeholder="Select a campus"
      placement="bottom start"
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}>
      {data.map(renderOption)}
    </Autocomplete>
  );
};

export default AutocompleteSearch;
