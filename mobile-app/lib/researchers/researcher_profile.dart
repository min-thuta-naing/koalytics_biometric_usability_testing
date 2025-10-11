import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/authentication/welcome.dart';

class ResearcherProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Researcher Profile',
          style: TextStyle(
            fontSize: 25,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 90, 121, 201),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
        child: SingleChildScrollView(
          child: ResearcherProfileContent(),
        ),
      ),
    );
  }
}

class ResearcherProfileContent extends StatelessWidget {
  final String researcherName = 'Your Name';
  final String researcherBio = 'A brief biography of the researcher goes here. This may include your educational background, areas of expertise, and research interests.';
  final String researcherContact = 'Email: your.email@example.com';
  final String researcherUniversity = 'Mae Fah Luang University';
  final String researcherResearchAreas = '• Biometric Usability Testing\n• User Experience Research\n• Data Science';
  final String researcherPublications = '• Research Paper 1: Title\n• Research Paper 2: Title\n• Research Paper 3: Title';
  final String researcherPhotoUrl = 'https://example.com/profile.jpg'; // Update this with a valid image URL

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Profile Picture
        Center(
          child: CircleAvatar(
            radius: 80.0,
            backgroundImage: NetworkImage(researcherPhotoUrl),
          ),
        ),
        SizedBox(height: 16.0),

        // Name & University
        Center(
          child: Column(
            children: [
              Text(
                researcherName,
                style: TextStyle(
                  fontSize: 28.0,
                  fontFamily: "Tommy",
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 5.0),
              Text(
                researcherUniversity,
                style: TextStyle(
                  fontSize: 18.0,
                  fontFamily: "Tommy",
                  color: Colors.grey,
                ),
              ),
            ],
          ),
        ),
        SizedBox(height: 20.0),

        // Information Cards
        _buildInfoCard('Bio', researcherBio),
        _buildInfoCard('Contact Information', researcherContact),
        _buildInfoCard('Research Areas', researcherResearchAreas),
        _buildInfoCard('Publications', researcherPublications),

        SizedBox(height: 30.0),

        // Log Out Button
        Center(
          child: ElevatedButton(
            onPressed: () {
              _navigateToWelcomePage(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Color.fromARGB(255, 90, 121, 201),
              foregroundColor: Colors.white,
              shadowColor: Color.fromARGB(255, 57, 114, 74),
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30),
              ),
              minimumSize: Size(150, 50),
            ),
            child: const Text(
              'Log Out',
              style: TextStyle(
                fontSize: 18,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }

  // Reusable Info Card Widget
  Widget _buildInfoCard(String title, String content) {
  return Container(
    width: double.infinity, // Expands to full width
    margin: EdgeInsets.symmetric(vertical: 10.0),
    child: Card(
      color: Colors.white,
      shadowColor: Color.fromARGB(255, 90, 121, 201),
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                fontSize: 18.0,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 90, 121, 201),
              ),
            ),
            SizedBox(height: 8.0),
            Text(
              content,
              style: TextStyle(
                fontSize: 16.0,
                fontFamily: "Tommy",
                color: Colors.black87,
              ),
            ),
          ],
        ),
      ),
    ),
  );
}


  void _navigateToWelcomePage(BuildContext context) {
    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (context, animation, secondaryAnimation) => const Welcome(),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          const begin = Offset(1.0, 0.0);
          const end = Offset.zero;
          const curve = Curves.easeInOut;

          var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
          var offsetAnimation = animation.drive(tween);

          return SlideTransition(
            position: offsetAnimation,
            child: child,
          );
        },
      ),
    );
  }
}