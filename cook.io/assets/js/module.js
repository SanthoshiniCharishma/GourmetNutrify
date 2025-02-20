/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";


/**
 * 
 * @param {Number} minute Cooking time
 * @returns {String}
 */


export const getTime =minute =>{
    const hour=Math.floor(minute/60);
    const day=Math.floor(hour/24);

    const time=day||hour||minute;
    const unitIndex=[day,hour,minute].lastIndexOf(time);
    const timeUnit=["days","hours","minutes"][unitIndex];

    return {time,timeUnit};
}