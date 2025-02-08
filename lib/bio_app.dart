import 'package:flutter/material.dart';

class BiometricApp extends StatelessWidget {
  const BiometricApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Biometric Usability Testing - App')),
      body: const Center(child: Text('Biometric Usability Testing for App')), 
    );
  }
}
