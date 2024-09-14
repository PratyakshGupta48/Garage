import {LayoutAnimation, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import ExploreHeader from '../Headers/ExploreHeader'
import { FlashList } from "@shopify/flash-list";
import { supabase } from '../../supabase';
import FastImage from 'react-native-fast-image'
import SkeletonContent from '../../SkeletonPlaceholder';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Feather'
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import MultiSlider from '@ptomasroos/react-native-multi-slider';

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const customLayout = {
  duration: 300,
  create:{
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  }
 }

const Explore = () => {

  const list = useRef(null);
  const sheetRef1 = useRef(null);
  const handlePresentModalPress = useCallback(() => {sheetRef1.current?.present();}, []);
  const handleClosePress = () => sheetRef1.current.close()
  const renderBackdrop = useCallback((props)=><BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />);

  const [items, setItems] = useState();
  const [refresh,setRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [yearRange, setYearRange] = useState([1980, 2024]);
  const [priceRange, setPriceRange] = useState([0, 500000]);

  useEffect(() => {
    const fetchData = async () => {
      
      list.current?.prepareForLayoutAnimationRender();
      let query = supabase.from('Listings').select('*');

      if (Array.isArray(selectedCategory) && selectedCategory.length > 0)
        query.or(selectedCategory.map((category) => `categories.cs.[${category}]`).join(','));
      else if (selectedCategory !== -1)
        query = query.filter('categories', 'cs', [selectedCategory]);
  
      const { data, error } = await query;
      if (error) console.log('Error fetching data:', error);
      else {
        LayoutAnimation.configureNext(customLayout);
        setItems(data);
      }
    };
    fetchData();

  }, [refresh, selectedCategory]);
  
  const renderItem = ({item}) => {
    return(
      <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.listing}>
        <FastImage style={styles.image} source={{ uri: item.imageUrl , priority: FastImage.priority.high, cache:'immutable'}} resizeMode={FastImage.resizeMode.cover} defaultSource={require('../../Images/placeholder.png')}/>
        <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color:'#000', paddingTop:10}}>{item.listingTitle}</Text>
        <Text style={styles.text2}>{item.sellingPrice.toLocaleString('en-US', {style: 'currency',currency: 'USD',})}</Text>
        <Text style={styles.text2}>Accepting Offers</Text>
      </View>    
      </TouchableOpacity>
    )
  }

  return (<>
    <ExploreHeader onCategorySelect={setSelectedCategory} />
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <FlashList
        ref={list}
        data={items}
        keyExtractor={(item) => item.id }
        onRefresh={()=>{setRefresh(!refresh)}}
        refreshing={false}
        renderItem={renderItem}
        estimatedItemSize={404.7}
        contentContainerStyle={{backgroundColor:'#fff', paddingHorizontal:16}}
        ListEmptyComponent={SkeletonContent}
      />
      <TouchableOpacity onPress={handlePresentModalPress} style={styles.SortView} activeOpacity={0.5}><Icon name='sort' color='#121212' size={21}/></TouchableOpacity>
    </View>
    <BottomSheetModal
      ref={sheetRef1}
      snapPoints={['50%']}
      enablePanDownToClose={true}
      enableOverDrag={true}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{display:'none',position:'absolute'}}
    >
      <View style={{flex: 1, backgroundColor: '#fff', paddingHorizontal: 13}}>
        <View style={styles.flexContainer}>
          <Icon2 onPress={handleClosePress} name='x' color='#1a1a1a' size={20}/>
          <Text style={{color: '#1a1a1a', fontFamily: 'Montserrat-SemiBold', fontSize: 16}}>Sort & Filter</Text>
          <Icon2 name='x' color='#fff' size={20}/>
        </View>
        <Text style={styles.text3}>Sort</Text>
        <View style={{height:34, marginTop:10}}>
          <BottomSheetScrollView horizontal showsHorizontalScrollIndicator={false} >
            <Text style={styles.filterOption}>Most Relevant</Text>
            <Text style={styles.filterOption}>Latest</Text>
            <Text style={styles.filterOption}>Price: Low to High</Text>
            <Text style={styles.filterOption}>Price: High to Low</Text>
          </BottomSheetScrollView>
        </View>

        <Text style={styles.text3}>Year</Text>
        <View style={styles.flexContainer}>
          <MultiSlider
            values={yearRange}
            onValuesChange={(values) => setYearRange(values)}
            min={1980}
            max={2024}
            step={1}
            allowOverlap={false}
            snapped
            sliderLength={240}
            trackStyle={{backgroundColor:"#dddddd",height:3,borderRadius:10}}
            selectedStyle={{backgroundColor:'#ff5b00'}}
            markerStyle={{backgroundColor:'#fff', borderColor:'#ff5b00', borderWidth:2}}
          />
          <Text style={[styles.text3,{fontSize:15, paddingBottom:4}]}>{yearRange[0]} - {yearRange[1]}</Text>
        </View>

        <Text style={styles.text3}>Price</Text>
        <View style={styles.flexContainer}>
          <MultiSlider
            values={priceRange}
            onValuesChange={(values) => setPriceRange(values)}
            min={0}
            max={500000}
            step={1000}
            allowOverlap={false}
            snapped
            sliderLength={240}
            trackStyle={{backgroundColor:"#dddddd",height:3,borderRadius:10}}
            selectedStyle={{backgroundColor:'#ff5b00'}}
            markerStyle={{backgroundColor:'#fff', borderColor:'#ff5b00', borderWidth:2}}
          />
          <Text style={[styles.text3,{fontSize:15, paddingBottom:4}]}>${priceRange[0]} - ${priceRange[1]}</Text>
        </View>

        <View style={[styles.flexContainer,{paddingTop: 20}]}>
          <Text style={[styles.text3,{paddingTop:0}]}>State</Text>
          <Text style={[styles.text3,{paddingTop:0, fontSize: 13}]}>View all <Icon2 name='chevron-right' color='#121212' size={15}/></Text>
        </View>

        <View style={[styles.flexContainer,{paddingTop: 43}]}>
          <Text style={[styles.text3,{paddingTop:0}]}>Category</Text>
          <Text style={[styles.text3,{paddingTop:0, fontSize: 13}]}>View all <Icon2 name='chevron-right' color='#121212' size={15}/></Text>
        </View>

      </View>
    </BottomSheetModal>
  </>)
}

export default Explore

const styles = StyleSheet.create({
  listing: {
    paddingVertical: 16,
    marginTop:5,
  },
  image: {
    height: 300,
    borderRadius: 10,
  },
  text2:{
    fontFamily: 'Montserrat-Medium',
    color:'#727272',
    fontSize:13,
    paddingTop:4
  },
  SortView:{
    backgroundColor:'#fff',
    borderRadius:50,
    padding:10,
    position:'absolute',
    bottom:20,
    right:20,
    elevation:5
  },
  filterOption: {
    color: '#121212',
    fontFamily: 'Montserrat-Medium',
    fontSize: 13.5,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    borderRadius: 15,
    paddingHorizontal: 9,
    paddingVertical: 8,
    marginRight: 10,
  },
  flexContainer:{
    flexDirection:'row',
    alignItems:"center",
    justifyContent:'space-between'
  },
  text3:{
    color: '#121212',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    paddingTop: 20
  }
})