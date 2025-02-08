import 'package:flutter/material.dart';

class BiometricTest extends StatelessWidget {
  const BiometricTest({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Biometric Usability Testing')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'Biometric Usability Testing',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            const Text(
              'This page can display biometric data or allow the researcher to start a usability test.',
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context); // Navigate back to ResearcherLanding
              },
              child: const Text('Go Back'),
            ),
          ],
        ),
      ),
    );
  }
}

