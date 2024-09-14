import React from 'react';
import { View} from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function SkeletonContent () {
  return <SkeletonPlaceholder backgroundColor='#f2f2f2' highlightColor='#fafcff'>
    <View style={{marginHorizontal:16 ,height: 300 ,borderRadius:10,marginBottom:30, marginTop:21}}/>
    <View style={{marginHorizontal:16 ,height: 300 ,borderRadius:10,marginBottom:30}}/>
    <View style={{marginHorizontal:16 ,height: 300 ,borderRadius:10,marginBottom:30}}/>
  </SkeletonPlaceholder> 
}