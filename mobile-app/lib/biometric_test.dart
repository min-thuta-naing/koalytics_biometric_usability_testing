import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/bio_app.dart'; // For app
import 'package:koalytics_biometric_usability_testing/bio_web.dart'; // For web

class BiometricTestPopup extends StatelessWidget {
  const BiometricTestPopup({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Select Test Type'),
      content: const Text('Choose the type of biometric test you want to proceed with:'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const BiometricApp()), // For App
            );
          },
          child: const Text('For App'),
        ),
        TextButton(
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const BiometricWeb()), // For Web
            );
          },
          child: const Text('For Web'),
        ),
      ],
    );
  }
}
