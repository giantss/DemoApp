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
import JShareModule from 'jshare-react-native'

export default class Share extends Component<{}> {


    constructor(props){
        super(props);
        // JShareModule.setDebug({enable: true});

        if(Platform.OS === 'ios'){
            let config =
                {
                    appKey:'a1703c14b186a68a66ef86c1',
                    channel:'',
                    advertisingId:'',
                    isProduction:false,
                    wechatAppId: 'wxc40e16f3ba6ebabc',
                    wechatAppSecret: 'dcad950cd0633a27e353477c4ec12e7a',
                    qqAppId: '1105864531',
                    qqAppKey: 'glFYjkHQGSOCJHMC',
                    sinaWeiboAppKey: '374535501',
                    sinaWeiboAppSecret: 'baccd12c166f1df96736b51ffbf600a2',
                    sinaRedirectUri: 'https://www.jiguang.cn',
                    isSupportWebSina: true
                };


            JShareModule.setup(config);
        }

    }



    onGetUserInfo = () => {
        let param = {
            platform: "qq"
        };
        JShareModule.getSocialUserInfo(param, (map) => {
            console.log(JSON.stringify(map));
        }, (errorCode) => {
            console.log("errorCode: " + errorCode);
        });
    };

    onPlatformAuth = () => {
        let param = {
            platform: "qq"
        };
        JShareModule.isPlatformAuth(param, (result) => {
            console.log(param.platform + "is Auth: " + result);
        });
    };

    onRemoveAuthorize = () => {
        let param = {
            platform: "qq"
        };
        JShareModule.cancelAuthWithPlatform(param, (code) => {
            if (code === 0) {
                console.log("remove authorize succeed");
            } else {
                console.log("remove authorize failed, errorCode: " + code);
            }
        });
    };
    onShareImagePress = () => {
        /* {
         *  type: 'image'
         *  platform: platformString  //
         *  imagePath: String   // 本地图片路径 imagePath, imageUrl imageArray 必须三选一
         *  imageUrl: String // 网络图片地址，必须以 http 或 https 开头，imagePath, imageUrl imageArray 必须三选一
         *  imageArray: [String]  // (选填: 分享到 Qzone 才提供这个字段) 如果需要分享多张图片需要这个参数，数组中问题图片路径 imagePath, imageUrl imageArray 必须三选一
         * }
         */
        // Done
        let shareParam = {
            platform: "qq",
            type: "image",
            text: "JShare test text",
            imageUrl: "http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg"
        };

        JShareModule.share(shareParam, (map) => {
            console.log("share succeed, map: " + JSON.stringify(map));
        }, (map) => {
            console.log("share failed, map: " + JSON.stringify(map));
        });
    };

    onShareLinkPress = () => {

        /* {
         *  type: 'link'
         *  platform: platformString  //
         *  url: String // 必填，网页 url
         *  imagePath: String // 选填，本地图片路径 imagePath，imageUrl 必须二选一
         *  imageUrl: String // 选填，网络图片地址 imagePath imageUrl 必须二选一
         *  title: String // 选填
         *  text: String // 选填
         * }
         */
        // Done
        let shareParam = {
            platform: "qq",
            type: "link",
            url: "https://www.baidu.com",
            imageUrl: "http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg",
            title: " shared link",
            text: "the web link",
        };

        JShareModule.share(shareParam, (map) => {
            console.log("share succeed, map: " + JSON.stringify(map));
        }, (map) => {
            console.log("share failed, map: " + JSON.stringify(map));
        });
    };

    onGetPlatformList = () => {
        JShareModule.getPlatformList((list) => {
            console.log("list: " + list);
        });
    };

    onClientValid = () => {
        let param = {
            platform: "qq"
        };
        JShareModule.isClientValid(param, (result) => {
            console.log(param.platform + "is valid: " + result);
        });
    };

    onAuthorize = () => {
        let param = {
            platform: "qq"
        };
        JShareModule.authorize(param, (map) => {
            console.log("Authorize succeed " + map);
        }, (errorCode) => {
            console.log("Authorize failed, errorCode : " + errorCode);
        });
    };
    isAuthorize = () => {
        let param = {
            platform: "qq"
        };

        JShareModule.isAuthorize(param, (result) => {
            console.log(result);
        });
    };

    isSinaWeiboWebLogined = () => {
        JShareModule.isSinaWeiboWebLogined((isLogin) => {
            if (isLogin === true) {
                console.log("sina weibo is login");
            } else {
                console.log("sina weibo is not login");
            }
        });
    };
    sinaWeiboWebLogOut = () => {
        JShareModule.sinaWeiboWebLogOut((success) => {
            if (success === true) {
                console.log("sina weibo logout success");
            } else {
                console.log("sina weibo logout fail");
            }
        });
    };

    isWeChatInstalled = () => {
        JShareModule.isWeChatInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log("wechat is intalled");
            } else {
                console.log("wechat is not installed");
            }
        });
    };
    isQQInstalled = () => {
        JShareModule.isQQInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log("QQ is intalled");
            } else {
                console.log("QQ is not installed");
            }
        });
    };

    isSinaWeiBoInstalled = () => {
        JShareModule.isSinaWeiBoInstalled((isInstalled) => {
            if (isInstalled === true) {
                console.log("sina weibo is intalled");
            } else {
                console.log("sina weibo is not installed");
            }
        });
    };


    render() {

        let platformApiButtons = Platform.OS === 'ios' ?
            <View style={styles.container}>
                <Button style={styles.bottom} title='获取社交平台用户信息' onPress={this.onGetUserInfo} />
                {/*<Button style={styles.bottom} titleStyle={{color: 'red'}} title='判断是已否授权接口' onPress={this.isAuthorize} />*/}
                {/*<Button style={styles.bottom} titleStyle={{color: 'red'}} title='授权接口' onPress={this.onAuthorize} />*/}
                <Button style={styles.bottom} title='检查不存在新浪客户端情况下的网页端是否登陆' onPress={this.isSinaWeiboWebLogined} />
                <Button style={styles.bottom} title='登出新浪网页端最新帐号' onPress={this.sinaWeiboWebLogOut} />
                <Button style={styles.bottom} title='检查是否安装微信客户端' onPress={this.isWeChatInstalled} />
                <Button style={styles.bottom} title='检查是否存在QQ客户端' onPress={this.isQQInstalled} />
                <Button style={styles.bottom} title='检查是否存在新浪微博客户端' onPress={this.isSinaWeiBoInstalled} />
                <Button style={styles.bottom}  title='判断某平台是否支持授权' onPress={this.onPlatformAuth} />
                <Button style={styles.bottom}  title='删除用户授权本地数据' onPress={this.onRemoveAuthorize} />
                <Button style={styles.bottom}  title='分享图片信息' onPress={this.onShareImagePress} />
                <Button style={styles.bottom}  title='链接分享' onPress={this.onShareLinkPress} />



            </View> :
            <View style={styles.container}>
                <Button style={styles.bottom} title='获取SDK所有能用的平台名称' onPress={this.onGetPlatformList} />
                <Button style={styles.bottom} title='判断该平台的分享是否有效' onPress={this.onClientValid} />
                <Button style={styles.bottom} title='授权接口' onPress={this.onAuthorize} />
                {/*<Button style={styles.bottom} title='判断是已否授权接口' onPress={this.isAuthorize} />*/}
                <Button style={styles.bottom} title='获取社交平台用户信息' onPress={this.onGetUserInfo} />
                <Button style={styles.bottom}  title='判断某平台是否支持授权' onPress={this.onPlatformAuth} />
                <Button style={styles.bottom}  title='删除用户授权本地数据' onPress={this.onRemoveAuthorize} />
                <Button style={styles.bottom}  title='分享图片信息' onPress={this.onShareImagePress} />
                <Button style={styles.bottom}  title='链接分享' onPress={this.onShareLinkPress} />


            </View>;
        return (
            <View style={{flex: 1,}}>
                {platformApiButtons}
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
