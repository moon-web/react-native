//
//  BDLocationManager.h
//  ipcommune_app
//
//  Created by haiyu on 2018/7/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>

typedef void (^BDLocationBlock)(CLLocationCoordinate2D coordinate);
@interface BDLocationManager : NSObject;
/**
 * 定时返回经纬度
 */
@property(nonatomic, strong)BDLocationBlock locationBlock;
+ (instancetype)shareManager;

- (void)startUpdateLocation;

- (void)startSingleLocation;

- (void)startReportLocation;

- (void)stopUpdateLocation;

@end
