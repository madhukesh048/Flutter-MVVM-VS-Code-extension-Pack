[![Flutter Extensions](https://img.shields.io/badge/Flutter-grey?style=flat-square&logo=flutter&logoColor=blue)](https://flutter.dev)
[![GitHub](https://img.shields.io/github/license/madhukesh048/Flutter-MVVM-VS-Code-extension-Pack?color=blue&style=flat-square)](https://raw.githubusercontent.com/madhukesh048/Flutter-MVVM-VS-Code-extension-Pack/master/LICENSE)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/madhukesh040011.flutter-mvvm-architecture-generator?color=green&label=VS%20Code%20Downloads&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=madhukesh040011.flutter-mvvm-architecture-generator)
[![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/madhukesh040011.flutter-mvvm-architecture-generator?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=madhukesh040011.flutter-mvvm-architecture-generator&ssr=false#review-details)

# Flutter MVVM Architecture Generator [![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/madhukesh040011.flutter-mvvm-architecture-generator?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=madhukesh040011.flutter-mvvm-architecture-generator)

VsCode extension to generate boilerplate code when using [FilledStacks' responsive architecture](https://www.filledstacks.com/tutorials) using Providers

## Features

### Initialize Architecture

Initialize the project with the following project structure:

```bash
--root
    |-- android
    |-- build
    |-- ios
    |-- lib
        |-- core
            |-- base
                |-- base_model.dart
                |-- base_service.dart
                |-- base_view_model.dart
            |-- models
            |-- services
                |-- navigation_service.dart
            locator.dart
            logger.dart
            providers.dart
        |-- theme
        |-- views
            |-- home
                |-- home_desktop.dart
                |-- home_mobile.dart
                |-- home_tablet.dart
                |-- home_view_model.dart
                |-- home_view.dart
        |-- widgets
        main.dart
    |-- test
    |-- .gitignore
    |-- pubspec.yaml
```

It will also add the following dependencies to the `pubspec.yaml` file

- responsive_builder: ^0.1.4
- provider: ^3.2.0
- logger: ^0.7.0+2
- get_it: ^3.0.3
- equatable: ^1.0.1

![Initializing the architecture](images/init.gif)

### Create View

The create view command will add a **View**, a **ViewModel** and the responsive variants for Tablet, Mobile and Desktop.

![Create View](images/views.gif)

As of version 1.4.0 you can create sub folders for views.

#### Example

If you give parameter for class name as `intro/splash/demo`, the extension will create a directory structure like this

```bash
--root
    |-- android
    |-- ios
    |-- lib
        |-- core
        |-- views
            |-- intro
                |-- splash
                    |-- demo
                        |-- demo_view.dart
                        |-- demo_view_model.dart
                        |-- demo_tablet.dart
                        |-- demo_mobile.dart
                        |-- demo_desktop.dart
            |-- main.dart
        |-- theme
        |-- main.dart
    |-- test
    |-- pubspec.yaml
```

### Create Widget

This command will create a Widget in the `lib/widgets` folder with the initial boilerplate and responsive variants.
