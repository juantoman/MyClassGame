// This section sets up some basic app metadata, the entire section is optional.
App.info({
  name: '@MyClassGame',
  description: 'We play, we learn',
  author: '@juantoman',
  email: 'myclassgame@gmail.com',
  website: 'https://www.myclassgame.tk',
  version: "1.0.0"
});

// Set up resources such as icons and launch screens.
App.icons({
  // More screen sizes and platforms...
	'android_mdpi': 'images/mcg_ico.png',
	'android_hdpi': 'images/mcg_ico.png',
	'android_xhdpi': 'images/mcg_ico.png',
	'android_xxhdpi': 'images/mcg_ico.png',
	'android_xxxhdpi': 'images/mcg_ico.png'
});

App.launchScreens({
  // More screen sizes and platforms...
	'android_mdpi_portrait': 'images/mcg_splash.png',
	'android_mdpi_landscape': 'images/mcg.png',
	'android_hdpi_portrait': 'images/mcg_splash.png',
	'android_hdpi_landscape': 'images/mcg.png',
	'android_xhdpi_portrait': 'images/mcg_splash.png',
	'android_xhdpi_landscape': 'images/mcg.png',
	'android_xxhdpi_portrait': 'images/mcg_splash.png',
	'android_xxhdpi_landscape': 'images/mcg.png',
	'android_xxxhdpi_portrait': 'images/mcg_splash.png',
	'android_xxxhdpi_landscape': 'images/mcg.png'
});

// Set PhoneGap/Cordova preferences.
App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('android-targetSdkVersion', '29');

// Set PhoneGap/Cordova rules.
// Regla para ver imágenes de cloudinary
App.accessRule('*://*.cloudinary.com/*');
App.accessRule('*://*.googleapis.com/*');
App.accessRule('*://*.googleusercontent.com/*');
App.accessRule('*://*.googleusercontent.com/*');
App.accessRule('*');

// Parámetros Google
//https://github.com/meteor/cordova-plugin-googleplus#blabla
App.configurePlugin('cordova-plugin-googleplus', {
    REVERSED_CLIENT_ID: 'com.googleusercontent.apps.422269930750-qnhfh8ed8tato750cl9amks7mt7luihq'
});
