keytool -list -printcert -jarfile YOUR_APK.apk | grep SHA1 | awk ‘{ print $2 }’ | xxd -r -p | openssl base64
