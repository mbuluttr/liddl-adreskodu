import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import {ListProps} from './List.types';
import {useNavigation} from '@react-navigation/native';
import {AppNativeStackScreenProps} from '../../routers';
import {styles} from './List.styles';
import {Colors} from '../../constants';

const ItemSeparatorComponent = () => <View style={styles.separator} />;

const List = ({data, title, onItemPress, loading, isSearched}: ListProps) => {
  const navigation =
    useNavigation<AppNativeStackScreenProps<'Home'>['navigation']>();

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      testID={'List.Item'}
      style={styles.itemContainer}
      onPress={() => onItemPress(item)}
      activeOpacity={0.8}>
      <Text style={styles.itemText}>{item.bilesenAdi}</Text>
    </TouchableOpacity>
  );

  const renderListEmptyComponent = isSearched ? (
    <View testID={'List.EmptyContainer'} style={styles.emptyContainer}>
      <Text testID={'List.EmptySearchedText'} style={styles.emptyText}>
        Aradığınız veri henüz sistemde bulunmamaktadır.
      </Text>
    </View>
  ) : (
    <View testID={'List.EmptyContainer'} style={styles.emptyContainer}>
      <Text testID={'List.EmptyText'} style={styles.emptyText}>
        Bu bilgilere ait veri henüz sistemde bulunmamaktadır.
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          testID={'List.BackButton'}
          style={[styles.buttonContainer, {backgroundColor: Colors.lightGray}]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.buttonText, {color: Colors.darkBlue}]}>
            Geri Dön
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID={'List.HomeButton'}
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Yeni Sorgu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View testID={'List.Container'} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text testID={'List.HeaderTitle'} style={styles.headerTitle}>
          {title}
        </Text>
      </View>

      {loading ? (
        <LoadingIndicator fullPage={true} />
      ) : (
        <FlatList
          testID={'List.FlatList'}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContentContainer}
          ItemSeparatorComponent={ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderListEmptyComponent}
        />
      )}
    </View>
  );
};

export default List;
