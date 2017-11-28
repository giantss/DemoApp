/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
import ImagePicker from 'react-native-syan-image-picker'

import { Button } from 'teaset'
import Share from './app/Share'
import JPushModule from 'jpush-react-native'
import JAnalyticsModule from './app/Statistics'


export default class App extends Component<{}> {

    //获取registrationid
    getRegistrationID = () => {

        JPushModule.getRegistrationID((registrationid) => {
            alert(registrationid);
        });
    };

    //在原有 tags 的基础上添加 tags，方便后面批量推送消息
    addTags = () => {
            JPushModule.addTags(['test'], (result)=> {
                alert('addTags success:' + JSON.stringify(result));
            })
    };

    //删除指定的 tags
    deleteTags = () => {
            JPushModule.deleteTags(['test'], (result)=> {
                alert('deleteTags success:' + JSON.stringify(result));
            })
    };

  //清除所有 tags
    cleanTags = () => {
            JPushModule.cleanTags((success)=> {
                alert('cleanTags success' + JSON.stringify(success));
            })
    };

    //设置 tags
    setTags = () => {
            JPushModule.setTags(['test','test1'], (success)=> {
                alert('cleanTags success' + JSON.stringify(success));
            })
    };

    //设置别名，最好不要重复，可以使用uid等参数
    setAlias = () => {
            JPushModule.setAlias('24344', (result)=> {
                alert('setAlias success:' + JSON.stringify(result));
            })
    };
    //设置应用 badge 值 返回值是true 或者 false
    setBadge = () => {
        JPushModule.setBadge(5, (success) => {

            alert(success);
        });
    };

    //获取应用 badge 值
    getBadge = () => {
        JPushModule.getBadge((badge) => {
            alert(badge);
        });
    };
    //发送本地推送
    /**
     * buildId : Number // 设置通知样式，1 为基础样式，2 为自定义样式。自定义样式需要先调用 setStyleCustom 接口设置自定义样式。(Android Only)
     * id : Number // 通知的 id, 可用于取消通知
     * title : String // 通知标题
     * content : String // 通知内容
     * extra : Object // extra 字段
     * fireTime : Number // 通知触发时间的时间戳（毫秒）
     * badge : Number // 本地推送触发后应用角标的 badge 值 （iOS Only）
     * sound : String // 指定推送的音频文件名字 （iOS Only）
     * subtitle : String // 子标题 （iOS10+ Only）
     */
    sendLocalNotification = () => {
        let currentDate = new Date();
        JPushModule.sendLocalNotification(
            {
                buildId: 1,
                id:5, // 通知的 id, 可用于取消通知 自定义表示消息的唯一性
                title:'haha',
                content:'content',
                extra:{key1:'value1',key2:'value2'},
                fireTime: currentDate.getTime() + 3000,
                badge: 8,
                // sound: 'fasdfa',
                subtitle: "subtitle",
            }
        )
    };



    componentWillMount() {

        if(Platform.OS === 'ios'){
            JPushModule.setupPush();  // if you add register notification in Appdelegate.m 有 don't need call this function
            //监听：应用没有启动的状态点击推送打开应用
            JPushModule.addOpenNotificationLaunchAppListener((result) => {
                alert('点击推送事件', 'the notification is :' + JSON.stringify(result))
            });

            //监听：应用连接已登录
            JPushModule.addnetworkDidLoginListener(() => {
                alert('应用连接已登录');
            });

        }else{

            JPushModule.notifyJSDidLoad((resultCode) => {
                alert(resultCode);
            });
            /**
             * 如果添加这个监听，设备注册成功后，打开应用将会回调这个事件。
             */
            JPushModule.addGetRegistrationIdListener(() => {
                alert('打开应用后回调')
            })
        }

        //监听：点击推送事件
        JPushModule.addReceiveOpenNotificationListener((result) => {
            alert('点击推送事件',JSON.stringify(result))
        });

        JPushModule.addReceiveNotificationListener((result) => {
            alert('接收推送事件',JSON.stringify(result))
        });
        //监听：连接状态变更
        JPushModule.addConnectionChangeListener((result) => {
            if (result) {
                alert('网络已连接')
            } else {
                alert('网络已断开')
            }
        });

    }

    initPush = () => {

        JPushModule.initPush();
    };

    onStop = () => {

        JPushModule.stopPush();
    };
    resumePush = () => {

        JPushModule.resumePush();
    };

    crashLogOFF = () => {

        JPushModule.crashLogOFF();
    };

    crashLogON = () => {

        JPushModule.crashLogON();
    };

    clearAllNotifications = () => {

        JPushModule.clearAllNotifications();
    };


    clearNotificationById = () => {

        JPushModule.clearNotificationById(1);
    };

    getInfo = () => {

        JPushModule.getInfo((map) => {
            alert(JSON.stringify(map));
        });
    };


    setStyleBasic = () => {

        JPushModule.setStyleBasic();
    };



    setStyleCustom = () => {

        JPushModule.setStyleCustom();
    };



    setLatestNotificationNumber = () => {

        JPushModule.setLatestNotificationNumber(5);
    };

    /**
     * Android Only
     * @param {object} config = {"startTime": String, "endTime": String}  // 例如：{startTime: "20:30", endTime: "8:30"}
     */
    setSilenceTime = () => {

        JPushModule.setSilenceTime();
    };

    setPushTime = () => {

        JPushModule.setPushTime();
    };



    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners();
        NativeAppEventEmitter.removeAllListeners();
        if(Platform.OS !== 'ios') {
            JPushModule.removeGetRegistrationIdListener(callback);
        }
    }

  render() {


        let platformApiButtons = Platform.OS === 'ios' ?
                <View style={styles.container}>
                    <Button style={styles.bottom} title='获取registrationid' onPress={this.getRegistrationID} />
                    <Button style={styles.bottom}  title='添加Tags标签' onPress={this.addTags} />
                    <Button style={styles.bottom}  title='删除Tags标签' onPress={this.deleteTags} />
                    <Button style={styles.bottom}  title='清除所有Tags标签' onPress={this.cleanTags} />
                    <Button style={styles.bottom}  title='设置Tags标签' onPress={this.setTags} />
                    <Button style={styles.bottom}  title='设置Alias别名' onPress={this.setAlias} />
                    <Button style={styles.bottom}  title='发送本地通知' onPress={this.sendLocalNotification} />
                    <Button style={styles.bottom}  title='设置Badge' onPress={this.setBadge} />
                    <Button style={styles.bottom}  title='获取Badge' onPress={this.getBadge} />

                </View> :
                <View style={styles.container}>
                    <Button style={styles.bottom} title='初始化推送'  onPress={this.initPush} />
                    <Button style={styles.bottom} title='获取registrationid'  onPress={this.getRegistrationID} />
                    <Button style={styles.bottom}  title='添加Tags标签' onPress={this.addTags} />
                    <Button style={styles.bottom}  title='删除Tags标签' onPress={this.deleteTags} />
                    <Button style={styles.bottom}  title='清除所有Tags标签' onPress={this.cleanTags} />
                    <Button style={styles.bottom}  title='设置Tags标签' onPress={this.setTags} />
                    <Button style={styles.bottom}  title='设置Alias别名' onPress={this.setAlias} />
                    <Button style={styles.bottom} title='停止推送' onPress={this.onStop} />
                    <Button style={styles.bottom} title='恢复推送' onPress={this.resumePush} />
                    <Button style={styles.bottom}  title='发送本地通知' onPress={this.sendLocalNotification} />
                    <Button style={styles.bottom} title='停止上报崩溃日志' onPress={this.crashLogOFF} />
                    <Button style={styles.bottom} title='开启上报崩溃日志' onPress={this.crashLogON} />
                    <Button style={styles.bottom} title='清除所有通知' onPress={this.clearAllNotifications} />
                    <Button style={styles.bottom} title='根据notificationId清除通知' onPress={this.clearNotificationById} />
                    <Button style={styles.bottom} title='获取设备信息' onPress={this.getInfo} />
                    <Button style={styles.bottom} title='设置通知为基本样式' onPress={this.setStyleBasic} />
                    <Button style={styles.bottom} title='自定义通知样式' onPress={this.setStyleCustom} />
                    <Button style={styles.bottom} title='设置展示最近通知的条数' onPress={this.setLatestNotificationNumber} />
                    <Button style={styles.bottom} title='设置静默推送时间' onPress={this.setSilenceTime} />
                    <Button style={styles.bottom} title='设置允许推送时间' onPress={this.setPushTime} />
                </View>;

    return (
      <ScrollView style={styles.scrollView}>
          <View style={{flex:1, justifyContent:'center',alignItems: 'center'}}>
              <Text style={styles.text}>消息推送</Text>
                {platformApiButtons}
              <Text style={styles.text}>第三方登陆和分享</Text>
              <Share/>
              <Text style={styles.text}>统计</Text>
              <JAnalyticsModule/>

          </View>
      </ScrollView>
    );
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
