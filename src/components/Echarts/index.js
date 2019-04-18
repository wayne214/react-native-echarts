import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform, ScrollView } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.option !== this.props.option) {
  //     this.refs.chart.reload();
  //   }
  // }
  //
  // render() {
  //   return (
  //     <View style={{flex: 1, height: this.props.height || 400,}}>
  //       <WebView
  //         ref="chart"
  //         scrollEnabled = {false}
  //         injectedJavaScript = {renderChart(this.props)}
  //         style={{
  //           height: this.props.height || 400,
  //           backgroundColor: this.props.backgroundColor || 'transparent'
  //         }}
  //         scalesPageToFit={false}
  //         source={Platform.OS==='ios' ? require('./tpl.html'):{uri:'file:///android_asset/tpl.html'}}
  //         onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
  //       />
  //     </View>
  //   );
  // }


    // 预防过渡渲染
    shouldComponentUpdate(nextProps, nextState) {
        const thisProps = this.props || {}
        nextProps = nextProps || {}
        if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
            return true
        }
        for (const key in nextProps) {
            if (JSON.stringify(thisProps[key]) != JSON.stringify(nextProps[key])) {
                return true
            }
        }
        return false
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.option !== this.props.option) {
// this.refs.chart.reload();
// 解决数据改变时页面闪烁的问题
            this.refs.chart.injectJavaScript(renderChart(nextProps))
        }
    }

    render() {
        return (
            <ScrollView style={{flex: 1, height: this.props.height || 400,}}>
                <WebView
                    ref="chart"
                    scrollEnabled = {false}
                    injectedJavaScript = {renderChart(this.props)}
                    style={{
                        height: this.props.height || 400,
                        backgroundColor: this.props.backgroundColor || 'transparent'
                    }}
                    scalesPageToFit={Platform.OS === 'android' ? true : false}
                    source={Platform.OS==='ios' ? require('./tpl.html'):{uri:'file:///android_asset/tpl.html'}}
                    onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
                    originWhitelist={['*']}
                />
            </ScrollView>
        );
    }

}
