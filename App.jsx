import * as Yup from 'yup';
import {Formik, isEmptyArray} from 'formik';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'minimum 4 characters required')
    .max(16, 'maximum 16 characters allowed')
    .required('length is required'),
});

const App = () => {
  const currentTheme = useColorScheme();
  const [pswrd, setPswrd] = useState('');
  const [isPswrdGnrtd, setIsPswrdGnrtd] = useState(false);
  const [uprCase, setUprCase] = useState(false);
  const [lwrCase, setLwrCase] = useState(true);
  const [spcialChars, setSpcialChars] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [dark, setDark] = useState(currentTheme == 'dark');

  const generatePswrdStrng = pswrdLength => {
    const uppercaseAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/";
    const digits = '0123456789';

    let charsList = '';

    if (uprCase) charsList += uppercaseAlphabets;
    if (lwrCase) charsList += lowercaseAlphabets;
    if (numbers) charsList += digits;
    if (spcialChars) charsList += specialChars;

    const pswrdGen = createPswrd(charsList, pswrdLength);
    setPswrd(pswrdGen);
    setIsPswrdGnrtd(true);
  };

  const createPswrd = (characters, pswrdLngth) => {
    let rslt = '';
    for (var i = 0; i < pswrdLngth; i++) {
      const chracterIndex = Math.round(Math.random() * characters.length);
      // console.log(chracterIndex);
      rslt += characters.charAt(chracterIndex);
    }
    // console.log(rslt);
    return rslt;
  };

  const resetPswrdState = () => {
    setPswrd('');
    setIsPswrdGnrtd(false);
    setUprCase(false);
    setLwrCase(true);
    setNumbers(false);
    setSpcialChars(false);
  };

  return (
    // <SafeAreaView
    //   keyboardShouldPersistTaps="handled"
    //   style={dark ? styles.darkContainer : styles.container}>
    //   <ScrollView>
    //     <View>
    //       <Text>Password Generator</Text>
    //     </View>
    //     <View>
    //       <Switch value={dark} onValueChange={() => setDark(!dark)} />
    //     </View>
    //     <View>
    //       <Formik
    //         initialValues={{passwordLength: ''}}
    //         validationSchema={passwordSchema}
    //         onSubmit={values => {
    //           console.log(values);
    //           generatePswrdStrng(Number(values.passwordLength));
    //         }}>
    //         {({
    //           values,
    //           errors,
    //           touched,
    //           isValid,
    //           handleChange,
    //           handleSubmit,
    //           handleReset,
    //         }) => (
    //           <>
    //             <View>
    //               <View>
    //                 <TextInput
    //                   placeholder="enter length ex. 8"
    //                   keyboardType="numeric"
    //                   value={values.passwordLength}
    //                   onChangeText={handleChange('passwordLength')}
    //                 />
    //                 {touched && errors.passwordLength && (
    //                   <Text>{errors.passwordLength}</Text>
    //                 )}
    //               </View>
    //               <View>
    //                 <Text>Lower Case Alphabets</Text>
    //                 <BouncyCheckbox
    //                   disableBuiltInState
    //                   isChecked={lwrCase}
    //                   onPress={() => setLwrCase(!lwrCase)}
    //                   fillColor="#29ab87"
    //                 />
    //               </View>
    //               <View>
    //                 <Text>Upper Case Alphabets</Text>
    //                 <BouncyCheckbox
    //                   disableBuiltInState
    //                   isChecked={uprCase}
    //                   onPress={() => setUprCase(!uprCase)}
    //                   fillColor="#fed85d"
    //                 />
    //               </View>
    //               <View>
    //                 <Text>Special Characters</Text>
    //                 <BouncyCheckbox
    //                   disableBuiltInState
    //                   isChecked={spcialChars}
    //                   onPress={() => setSpcialChars(!spcialChars)}
    //                   fillColor="#c9a0dc"
    //                 />
    //               </View>
    //               <View>
    //                 <Text>Numerics Characters</Text>
    //                 <BouncyCheckbox
    //                   disableBuiltInState
    //                   isChecked={numbers}
    //                   onPress={() => setNumbers(!numbers)}
    //                   fillColor="teal"
    //                 />
    //               </View>
    //               <View>
    //                 <TouchableOpacity disabled={!isValid}>
    //                   <Text>Generate</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity>
    //                   <Text>Reset</Text>
    //                 </TouchableOpacity>
    //               </View>
    //             </View>
    //           </>
    //         )}
    //       </Formik>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

    <SafeAreaView
      keyboardShouldPersistTaps="handled"
      style={dark ? styles.darkContainer : styles.container}>
      <ScrollView>
        <View>
          <Text style={dark ? styles.darkTitle : styles.title}>
            Password Generator
          </Text>
        </View>
        <View>
          {/* <Text style={dark ? styles.darkCheckboxLabel : styles.checkboxLabel}>
            Dark Mode
          </Text> */}
          <Switch
            style={{marginBottom: 30}}
            value={dark}
            onValueChange={() => setDark(!dark)}
          />
        </View>
        <View>
          <Formik
            initialValues={{passwordLength: '8'}}
            validationSchema={passwordSchema}
            onSubmit={values => {
              // console.log(values);
              generatePswrdStrng(Number(values.passwordLength));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View>
                  <View>
                    <TextInput
                      style={dark ? styles.darkInput : styles.input}
                      placeholder="enter length ex. 8"
                      keyboardType="numeric"
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholderTextColor={dark ? '#ccc' : '#999'}
                    />
                    {touched && errors.passwordLength && (
                      <Text
                        style={{
                          color: 'red',
                          marginBottom: 20,
                          marginTop: -20,
                        }}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text
                      style={
                        dark ? styles.darkCheckboxLabel : styles.checkboxLabel
                      }>
                      Lower Case Alphabets
                    </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={lwrCase}
                      onPress={() => setLwrCase(!lwrCase)}
                      fillColor="#29ab87"
                      style={{width: 40}}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text
                      style={
                        dark ? styles.darkCheckboxLabel : styles.checkboxLabel
                      }>
                      Upper Case Alphabets
                    </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={uprCase}
                      onPress={() => setUprCase(!uprCase)}
                      fillColor="#fed85d"
                      style={{width: 40}}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text
                      style={
                        dark ? styles.darkCheckboxLabel : styles.checkboxLabel
                      }>
                      Special Characters
                    </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={spcialChars}
                      onPress={() => setSpcialChars(!spcialChars)}
                      fillColor="#c9a0dc"
                      style={{width: 40}}
                    />
                  </View>
                  <View style={styles.checkboxContainer}>
                    <Text
                      style={
                        dark ? styles.darkCheckboxLabel : styles.checkboxLabel
                      }>
                      Numerics Characters
                    </Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="teal"
                      style={{width: 40}}
                    />
                  </View>
                  <View style={{gap: 10}}>
                    <TouchableOpacity
                      disabled={!isValid}
                      onPress={() => handleSubmit()}
                      style={dark ? styles.darkButton : styles.button}>
                      <Text
                        style={
                          dark ? styles.darkButtonText : styles.buttonText
                        }>
                        Generate
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleReset();
                        resetPswrdState();
                      }}
                      style={[
                        dark ? styles.darkButton : styles.button,
                        {backgroundColor: 'rgba(74, 95, 135, 0.96)'},
                      ]}>
                      <Text
                        style={
                          dark ? styles.darkButtonText : styles.buttonText
                        }>
                        Reset
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
        <View>
          {isPswrdGnrtd && (
            <View style={{alignItems: 'center', marginVertical: 40}}>
              <Text
                selectable={true}
                style={{
                  color: dark ? '#fff' : '#000',
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 45,
                  backgroundColor: dark ? '#333' : '#c1d1d0',
                  borderRadius: 10,
                  textAlign: 'center',
                  width: '80%',
                }}>
                {pswrd}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Light mode background
  },
  darkContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark mode background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Light mode text color
    marginBottom: 20,
  },
  darkTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Dark mode text color
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: '#fff', // Light mode input background
    color: '#333', // Light mode input text color
  },
  darkInput: {
    height: 50,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 30,
    backgroundColor: '#333', // Dark mode input background
    color: '#fff', // Dark mode input text color
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333', // Light mode checkbox label color
  },
  darkCheckboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff', // Dark mode checkbox label color
  },
  button: {
    height: 50,
    backgroundColor: '#007bff', // Light mode button background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  darkButton: {
    height: 50,
    backgroundColor: '#1e90ff', // Dark mode button background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // Light mode button text color
  },
  darkButtonText: {
    fontSize: 18,
    color: '#fff', // Dark mode button text color
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333', // Light mode result text color
  },
  darkResult: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff', // Dark mode result text color
  },
});
