import 'package:flutter/material.dart';
import 'researcher.dart';

class HomeResearcher extends StatelessWidget {
  const HomeResearcher({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Researcher Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Welcome, Researcher!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ResearcherLanding()),
                );
              },
              child: const Text('Go to Researcher Dashboard'),
            ),
          ],
        ),
      ),
    );
  }
}

