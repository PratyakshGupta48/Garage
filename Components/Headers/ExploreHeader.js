import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';

const ExploreHeader = ({onCategorySelect}) => {
  
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);
  const itemsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [subActiveIndex, setSubActiveIndex] = useState(0);
  const indicatorPosition = useRef(new Animated.Value(14)).current;

  const id = {
  'Trending':-1,
  'Popular':[1,2,16,17],
  'Apparatus':[1,2,3,4,5,6,7,8,9],
  'Engines and pumpers':1,
  'Ladders, aerials, and quints':2,
  'Towers and platforms':3,
  'Rescue trucks and squads':4,
  'Ambulances':5,
  'Command units':6,
  'Brush trucks and minis':7,
  'Tankers and tenders':8,
  'Other apparatus':9,
  'Equipments':[10,11,12,13,14,15,16,17,18,19],
  'Helmets':10,
  'Rescue tools':11,
  'Adapters and valves':12,
  'Fire apparatus parts':13,
  'Radios and electronics':14,
  'SCBAs':15,
  'Turnout gear':16,
  'Hand tools':17,
  'Fans':18,
  'Nozzles':19,
  'More':[20,21,22,23,24,25,26,27,28,29,30],
  'Hose':20,
  'Other equipment':21,
  'Uniforms and clothing':22,
  'Boots':23,
  'Lights and sirens':24,
  'Firefighter straps':25,
  'Wildland firefighting gear':26,
  'EMS equipment':27,
  'Power tools and saws':28,
  'Handlights':29,
  'Scene lighting':30,
  }

  const categories = [
    {name:'Trending', icon:'fire'},
    {name:'Popular', icon:'star', subCategory:["Engines and pumpers", "Ladders, aerials, and quints", "Turnout gear", "Hand tools"]},
    {name:'Apparatus', icon:'settings', subCategory:["Engines and pumpers", "Ladders, aerials, and quints", "Towers and platforms", "Rescue trucks and squads", "Ambulances", "Command units", "Brush trucks and minis", "Tankers and tenders", "Other apparatus"]},
    {name:'Equipments', icon:'organization', subCategory:["Helmets", "Rescue tools", "Adapters and valves", "Fire apparatus parts", "Radios and electronics", "SCBAs", "Turnout gear", "Hand tools", "Fans", "Nozzles"]},
    {name:'More', icon:'equalizer', subCategory:["Hose", "Other equipment", "Uniforms and clothing", "Boots", "Lights and sirens", "Firefighter straps", "Wildland firefighting gear", "EMS equipment", "Power tools and saws", "Handlights", "Scene lighting"]},];

  const selectCategory = (index) => {
    const selected = itemsRef.current[index];
    selected?.measure((x, y, width, height, pageX) => {
      Animated.timing(indicatorPosition, {
        toValue: pageX+14,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true}).start();
    });
    setActiveIndex(index);
    onCategorySelect(id[categories[index].name]);
  };

  const selectSubcategory = (item, index) => {
    setSubActiveIndex(index);
    onCategorySelect(id[item]);
  };
  
  return (
    <View style={styles.Header}>
      <View style={styles.actionRow}>
        <View style={styles.searchBtn}>
          <Icon name="search" size={24} color={'#121212'}/>
          <View>
            <Text style={{ fontFamily: 'Montserrat-Medium', color:"#121212" }}>Find Your Gear?</Text>
            <Text style={{ color: "#727272", fontFamily: 'Montserrat-Medium', fontSize:11 }}>Any Gear · Any Condition · Anywhere</Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal ref={scrollRef} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContainer} style={{borderBottomColor:'#b8b8b8', borderBottomWidth:0.2}}>
        {categories.map((item, index) => (
          <TouchableOpacity activeOpacity={0.5} ref={(el) => (itemsRef.current[index] = el)} key={index} style={styles.categoriesBtn} onPress={() => selectCategory(index)}>
            <Icon2 name={item.icon} size={20} color={activeIndex === index ? '#000' : '#727272'} />
            <Text style={[styles.categoryText,{color:activeIndex === index ? "#121212" : "#727272"}]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <Animated.View style={[styles.indicator, { width: 50, transform: [{ translateX: indicatorPosition }] }]} />
      </ScrollView>
      {activeIndex!=0 && <ScrollView horizontal ref={scrollRef2} showsHorizontalScrollIndicator={false} style={styles.subCategoryContainer}>
        {categories[activeIndex].subCategory.map((item, index) => (
          <TouchableOpacity activeOpacity={0.5} key={item} onPress={()=>selectSubcategory(item, index)}>
            <Text style={[styles.subcategoryText, {color: subActiveIndex === index ? '#000' : '#727272'}]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  Header:{
    flexDirection:'column',
    backgroundColor:'#fff',
    elevation:4,
    zIndex:1
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop:43,
  },
  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 15,
    padding: 10,
    alignItems: 'center',
    width:'100%',
    borderRadius: 30,
    elevation:8,
    height:55
  },
  ScrollViewContainer:{
    alignItems: 'center',
    width:'100%',
    justifyContent:'space-between',
    marginTop:2,
  },
  categoryText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    paddingTop:7,
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  indicator: {
    height: 2,
    backgroundColor: '#121212',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius:5,
    borderTopLeftRadius:5
  },
  subCategoryContainer: {
    paddingTop: 6,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingBottom:6
  },
  subcategoryText:{
    fontFamily:'Montserrat-Medium',
    fontSize:11.5,
    paddingRight:15,
  },
});

export default ExploreHeader;
