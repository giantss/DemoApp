/**
 * Created by zhongpeng on 2017/11/24.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Alert,
    DeviceEventEmitter,
    NativeAppEventEmitter,
} from 'react-native';

import { Button } from 'teaset'
import JAnalyticsModule from 'janalytics-react-native'
export default class Statistics extends Component<{}> {


    constructor(props){
        super(props);

        if(Platform.OS === 'ios'){
            //初始化插件
            JAnalyticsModule.setup({appKey: 'a1703c14b186a68a66ef86c1'});
            //设置是否打印sdk产生的Debug级log信息, 默认为NO(不打印log)
            JAnalyticsModule.setDebug({enable: true});
            //开启Crash日志收集，默认是关闭状态.
            JAnalyticsModule.crashLogON();
        }

    }



    onStartLogPageView = () => {
        //开始记录页面停留
        JAnalyticsModule.startLogPageView({pageName: "text"})
    };

    onStopLogPageView = () => {
        //停止记录页面停留
        JAnalyticsModule.stopLogPageView({pageName: "test"})
    };

    onUploadLocation = () => {
        //上报位置信息
        JAnalyticsModule.uploadLocation({latitude: 0.4, longitude: 0.5})
    };

    onLoginPress = () => {
        let LoginEvent = {
            type: 'login',
            extra: {
                userId: "user1"
            },
            method: "login",
            success: true
        };
        JAnalyticsModule.postEvent(LoginEvent);
    };

    onRegisterPress = () => {
        let RegisterEvent = {
            type: "register",
            extra: {
                userId: "user2"
            },
            method: "register",
            success: true
        };
        JAnalyticsModule.postEvent(RegisterEvent);
    };

    onPurchasePress = () => {
        let PurchaseEvent = {
            goodsId: '123',
            type: 'purchase',
            extra: {
                userId: 'user2',
                customKey1: 'custom let1',
                customKey2: 'custom let2',
                customKey3: 'custom let3',
                customKey4: 'custom let4',
                customKey5: 'custom let5',
            },
            goodsType: 'sports',
            goodsName: 'basketball',
            price: 300,
            currency: 'CNY',
            count: 1,
            success: true
        };
        JAnalyticsModule.postEvent(PurchaseEvent);
    };

    onCountPress = () => {
        let CountEvent = {
            id: 'count1',
            extra: {
                userId: 'user1'
            },
            type: 'count'
        };
        JAnalyticsModule.postEvent(CountEvent);
    };

    onCalculatePress = () => {
        let CalculateEvent = {
            id: 'calculate1',
            extra: {
                userId: 'user1'
            },
            type: 'calculate',
            value: 200
        };
        JAnalyticsModule.postEvent(CalculateEvent);
    };

    onBrowsePress = () => {
        let BrowseEvent = {
            id: 'browse1',
            name: 'shenzhen news',
            type: 'browse',
            extra: {
                userId: 'user1'
            },
            contentType: 'news',
            duration: 60
        };
        JAnalyticsModule.postEvent(BrowseEvent);
    };





    render() {

            let uploadLocationBtn = Platform.OS === 'ios' ?
                <Button style={styles.bottom} title='上报位置(经度，纬度)信息' onPress={this.onUploadLocation} />:null;

        return (
                <View style={styles.container}>
                    <Button style={styles.bottom} title='开始记录页面停留' onPress={this.onStartLogPageView} />
                    <Button style={styles.bottom} title='停止记录页面停留' onPress={this.onStopLogPageView()} />
                    {uploadLocationBtn}
                    <Button style={styles.bottom} title='登陆事件' onPress={this.onLoginPress} />
                    <Button style={styles.bottom} title='注册事件' onPress={this.onRegisterPress} />
                    <Button style={styles.bottom} title='购买事件' onPress={this.onPurchasePress} />
                    <Button style={styles.bottom} title='计数事件' onPress={this.onCountPress} />
                    <Button style={styles.bottom} title='计算事件' onPress={this.onCalculatePress} />
                    <Button style={styles.bottom} title='浏览事件' onPress={this.onBrowsePress} />

                </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#cccccc',
        margin: 5,
        elevation:2,
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    scrollView: {
        backgroundColor: '#F5FCFF',
        paddingTop:Platform.OS === 'ios' ? 20 : 0
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    bottom: {
        margin: 10,

    },
    text: {
        margin:10,
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
    }
});
