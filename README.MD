# Run App
    yarn run android
    yarn run ios
# Release App
    react-native run-android --variant=release

==> https://facebook.github.io/react-native/docs/signed-apk-android
keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Tạo key vs file key: enow-order-key.keystore, pass minhbinh
    keytool -genkeypair -v -keystore enow-order-key.keystore -alias enow-order-alias -keyalg RSA -keysize 2048 -validity 10000
    Pass: minhbinh
# Copy enow-order-key.keystore vào thư mục android/app
# Vao android/gradle.properties (Thay doi thong so cho phu hop)
    MYAPP_UPLOAD_STORE_FILE=enow-order-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=enow-order-alias
    MYAPP_UPLOAD_STORE_PASSWORD=minhbinh
    MYAPP_UPLOAD_KEY_PASSWORD=minhbinh
# Copy cac dong vao android/app/build.gradle
    a. Sau defaultConfig
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }

    b. Trong buildTypes > release 
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
# vào android chạy dòng lệnh
    ./gradlew bundleRelease


# Fix some bug:
    error eperm operation not permitted unlink npm install
    => npm install --no-optional