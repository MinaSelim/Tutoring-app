import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import {Alert} from 'react-native';
import DataFetcher from '../../api/search/Search';
import React, {useEffect} from 'react';

interface IAutoCompleteSearch {
  category: string;
  itemToAdd: string;
  setItemToAdd: React.Dispatch<React.SetStateAction<string>>;
}

interface IAutoCompleteData {
  items: string[];
  displayedItems: string[];
}

const AutocompleteSearch: React.FunctionComponent<IAutoCompleteSearch> = ({
  category,
  itemToAdd,
  setItemToAdd,
}): JSX.Element => {
  const [data, setData] = React.useState<IAutoCompleteData>({
    items: [],
    displayedItems: [],
  });
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>('');

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

  useEffect(() => {
    setQuery(itemToAdd);
  }, [itemToAdd]);

  const onSelect = (index): void => {
    setItemToAdd(data.displayedItems[index]);
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
