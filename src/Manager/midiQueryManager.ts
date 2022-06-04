import Options from '../config'
import { TextEncoder } from 'util';

export default class midiQuery {
  constructor() { }

  private static queryBuilder(data: Array<number>) {
    return Array<number>().concat(Options.Driver.command.sysexHeader, data, [Options.Driver.command.sysexFooter]);
  }

  /**
   * 
   * @param m Layout number
   * @returns Array with layout change
   */
  public static setLayout(m: number) {
    return this.queryBuilder([Options.Driver.command.selectLayout, m])
  }

  /**
   * 
   * @param m Layout number
   * @returns Array with layout change
   */
   public static textScrolling(color: number, text: string, shouldLoop = false, speed = 7) {
    return this.queryBuilder([Options.Driver.command.textScrolling, +shouldLoop, speed, 0, color].concat( Array.from(new TextEncoder().encode(text))) )
  }

}