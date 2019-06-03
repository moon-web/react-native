//
//  CalendarManager.m
//  ipcommune_app
//
//  Created by haiyu on 2018/7/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

// CalendarManager.m
#import "CalendarManager.h"
#import "BDLocationManager.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation CalendarManager

{
  bool hasListeners;
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(calendarEventReminderReceived:)
                                                 name:@"EventReminder"
                                               object:nil];
  }
  return self;
}

RCT_EXPORT_MODULE();

#pragma mark - 给RN调用的方法

RCT_EXPORT_METHOD(addEvent:(NSString *)name)
{
//  NSString *location = [RCTConvert NSString:params[@"location"]];
//  NSDate *time = [RCTConvert NSDate:params[@"time"]];
//  NSString *description = [RCTConvert NSString:params[@"description"]];
//  RCTLogInfo(@"事件: %@, 地点: %@, 备注: %@", name, location, description);
  
//  RN调用启动定位
//  [[BDLocationManager shareManager] startUpdateLocation];
  [[BDLocationManager shareManager] startSingleLocation];

}

/**
 RN调用OC函数, 结果通过promises回调给RN
 @param findEvents 函数名
 @param resolve 成功回调
 @param rejecter 失败回调
 @return void
 */
RCT_REMAP_METHOD(findEvents, findEventsWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSArray *events = @[@"EVENTS0", @"EVENTS1", @"EVENTS2"];
  if (events) {
    resolve(events);
  } else {
    NSString *code = @"10010";
    NSError *error = [NSError errorWithDomain:@"com.xuyunan.NativeModules" code:[code integerValue] userInfo:nil];
    reject(code, @"There were no events", error);
  }
}

#pragma mark - 向RN发送消息

// 支持的通知事件，写在这里
- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EventReminder"];
}

// Will be called when this module's first listener is added.
-(void)startObserving
{
  hasListeners = YES;
  // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving
{
  hasListeners = NO;
  // Remove upstream listeners, stop unnecessary background tasks
}

- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  NSString *eventName = notification.userInfo[@"name"];
  if (hasListeners) { // Only send events if anyone is listening
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
  }
}

#pragma mark - CONSTANTS

// 给RN用的常量 (CalendarManager.firstDayOfTheWeek)
- (NSDictionary *)constantsToExport
{
  return @{ @"firstDayOfTheWeek": @"Monday" };
}

@end
