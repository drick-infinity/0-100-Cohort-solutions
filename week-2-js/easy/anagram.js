/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  str1 = str1.replace(/\s+/g,'').toLowerCase();
  str2 = str2.replace(/\s+/g,'').toLowerCase();

  if(str1.length !== str2.length){
    return false;
  }

  let String1 = str1.split('').sort().join('');
  let String2 = str2.split('').sort().join('');

  return String1 === String2;
}

module.exports = isAnagram;
