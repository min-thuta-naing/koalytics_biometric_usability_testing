// about_app.dart

import 'package:flutter/material.dart';

class AboutAppScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'About the App',
          style: TextStyle(
            fontSize: 25,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: AboutAppContent(),
      ),
    );
  }
}

class AboutAppContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        
        Text(
          'This app is designed to help users track and manage project history effectively. It includes features like project details, milestones, and project durations, which are displayed in an easy-to-read list format.',
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 32.0),
        Text(
          'Version: 1.0.0',
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 8.0),
        Text(
          'Developer: Your Name',
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 8.0),
        Text(
          'Contact: your.email@example.com',
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 32.0),
        Text(
          'Acknowledgments:',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text(
          '• Flutter Framework\n• Material Design\n• Dart Language',
          style: TextStyle(fontSize: 16.0),
        ),
      ],
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: AboutAppScreen(),
  ));
}
