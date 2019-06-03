//
//  CalendarManager.h
//  ipcommune_app
//
//  Created by haiyu on 2018/7/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

// CalendarManager.h
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#define CalendarManager(noti) [[NSNotificationCenter defaultCenter] postNotificationName:@"event-emitted" object:noti];

@interface CalendarManager : RCTEventEmitter<RCTBridgeModule>

@end
