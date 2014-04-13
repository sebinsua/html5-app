#!/usr/bin/env sh
mkdir -p platforms;
cordova platform add ios;
cordova plugin add org.apache.cordova.camera;
cordova plugin add org.apache.cordova.console;
cordova plugin add org.apache.cordova.device;
cordova plugin add org.apache.cordova.statusbar;
cordova plugin add org.apache.cordova.contacts;
