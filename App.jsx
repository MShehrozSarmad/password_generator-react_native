import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import * as Yup from "yup"

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(4, "minimum 4 characters required").max(16, "maximum 16 characters required").required('length is required')
})

const App = () => {

  const [pswrd, setPswrd] = useState('');
  const [isPswrdGnrtd, setIsPswrdGnrtd] = useState(false);
  const [uprCase, setUprCase] = useState(false);
  const [lwrCase, setLwrCase] = useState(true);
  const [spcialChars, setSpcialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePswrd = (pswrdLength) => {
    const uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/";
    const digits = "0123456789";

    const charsList = '';

    if (uprCase) charsList += uppercaseAlphabets;
    if (lwrCase) charsList += lowercaseAlphabets;
    if (numbers) charsList += digits;
    if (spcialChars) charsList += specialChars;

    const pswrdGen = createPswrd(charsList, pswrdLength);
    setPswrd(pswrdGen);
    setIsPswrdGnrtd(true);
  }

  const createPswrd = (characters, pswrdLngth) => {
    let rslt = '';
    for (var i = 0; i < pswrdLngth; i++) {
      const chracterIndex = Math.round(Math.random() * characters.length);
      console.log(chracterIndex)
      rslt += characters.charAt(chracterIndex);
    }
    console.log(rslt);
    return rslt;
  }

  const resetPswrdState = () => {
    setPswrd('');
    setIsPswrdGnrtd(false);
    setUprCase(false)
    setLwrCase(true);
    setNumbers(false);
    setSpcialChars(false);
  }


  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>hello world</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})