/**
 * @license MIT
 * @copyright 2023 codewithsadee
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

"use strict";

/**
 * @param {Array} queries Query array
 * @param {Function} successCallback Success callback function
 */

window.ACCESS_POINT="https://api.edamam.com/api/recipes/v2";
const APP_ID="d54d8d80";
const API_KEY="31939c45daa4475ca9edc88e363c27fe";

const TYPE="public";

export const fetchData=async function(queries,successCallback){
    const query=queries?.join("&")
    .replace(/,/g,"=")
    .replace(/ /g,"%20")
    .replace(/\+/g,"%2B");

    const url=`${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

    const response=await fetch(url);

    if(response.ok){
        const data=await response.json();
        successCallback(data);
    }
}