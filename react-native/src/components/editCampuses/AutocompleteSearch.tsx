import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import {Alert} from 'react-native';
import DataFetcher from '../../api/search/Search';
import React from 'react';

interface IAutoCompleteSearch {
  category: string;
}

interface IAutoCompleteData {
  items: string[];
  displayedItems: string[];
}

const AutocompleteSearch: React.FunctionComponent<IAutoCompleteSearch> = ({
  category,
}): JSX.Element => {
  const [data, setData] = React.useState<IAutoCompleteData>({
    items: [],
    displayedItems: [],
  });
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>('');
  const [selectedItem, setSelectedItem] = React.useState<string>('');

  const getData = async (): Promise<void> => {
    setFetched(true);
    let backendData;
    try {
      if (category === 'campuses')
        backendData = await DataFetcher.getCampuses();
      else backendData = await DataFetcher.getClasses(category);
      setData({items: backendData, displayedItems: backendData});
    } catch (error) {
      setData({items: ['No data'], displayedItems: ['No data']});
      Alert.alert(`${error}`);
    }
  };

  if (!fetched) getData();

  const onSelect = (index): void => {
    setSelectedItem(data.displayedItems[index]);
  };

  const onChangeText = (newQuery): void => {
    setQuery(newQuery);
    setData({
      ...data,
      displayedItems: data.items.filter((item) =>
        item.toLowerCase().includes(newQuery.toLowerCase()),
      ),
    });
  };

  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item} />
  );

  return (
    <Autocomplete
      placeholder="Select a campus"
      placement="bottom start"
      value={query}
      onSelect={onSelect}
      onChangeText={onChangeText}>
      {data.displayedItems.map(renderOption)}
    </Autocomplete>
  );
};

export default AutocompleteSearch;
