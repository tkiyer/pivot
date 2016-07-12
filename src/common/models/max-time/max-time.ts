/*
 * Copyright 2015-2016 Imply Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Class, Instance, isInstanceOf } from 'immutable-class';
import { $, Expression } from 'plywood';

export interface MaxTimeValue {
  time: Date;
  updated: Date;
}

export interface MaxTimeJS {
  time: Date | string;
  updated?: Date | string;
}

var check: Class<MaxTimeValue, MaxTimeJS>;
export class MaxTime implements Instance<MaxTimeValue, MaxTimeJS> {

  static isMaxTime(candidate: any): candidate is MaxTime {
    return isInstanceOf(candidate, MaxTime);
  }

  static fromNow(): MaxTime {
    var now = new Date();
    return new MaxTime({
      time: now,
      updated: now
    });
  }

  static fromDate(time: Date): MaxTime {
    return new MaxTime({
      time: time,
      updated: new Date()
    });
  }

  static fromJS(parameters: MaxTimeJS): MaxTime {
    var time = new Date(<any>parameters.time);
    if (isNaN(<any>time)) {
      throw new Error('maxTime must have a valid `time`');
    }
    return new MaxTime({
      time,
      updated: new Date(<any>(parameters.updated || parameters.time))
    });
  }


  public time: Date;
  public updated: Date;

  constructor(parameters: MaxTimeValue) {
    this.time = parameters.time;
    this.updated = parameters.updated;
  }

  public valueOf(): MaxTimeValue {
    return {
      time: this.time,
      updated: this.updated
    };
  }

  public toJS(): MaxTimeJS {
    return {
      time: this.time,
      updated: this.updated
    };
  }

  public toJSON(): MaxTimeJS {
    return this.toJS();
  }

  public toString(): string {
    return `[MaxTime: ${this.time.toISOString()}]`;
  }

  public equals(other: MaxTime): boolean {
    return MaxTime.isMaxTime(other) &&
      this.time.valueOf() === other.time.valueOf();
  }
}
check = MaxTime;

