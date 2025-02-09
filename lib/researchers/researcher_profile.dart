import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/welcome.dart';

class ResearcherProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 231, 243, 209), // Background color of the screen
      appBar: AppBar(
        title: Text(
          'Researcher Profile',
          style: TextStyle(
            fontSize: 25,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 231, 243, 209), 
      ),
      body: Padding (
        //padding: const EdgeInsets.all(16.0),
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: SingleChildScrollView( // Wrapping the content in a scrollable view
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
  final String researcherPhotoUrl = 'https://example.com/profile.jpg'; // URL of the researcher photo

  @override
  Widget build(BuildContext context) {
    return Column(

      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        
        Center(
          child: CircleAvatar(
            radius: 50.0,
            backgroundImage: NetworkImage(researcherPhotoUrl),
          ),
        ),
        SizedBox(height: 16.0),
        Text(
          researcherName,
          style: TextStyle(
            fontSize: 28.0,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8.0),
        Text(
          researcherUniversity,
          style: TextStyle(fontSize: 18.0, color: Colors.grey),
        ),
        SizedBox(height: 16.0),
        Text(
          'Bio:',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text(
          researcherBio,
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 16.0),
        Text(
          'Contact Information:',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text(
          researcherContact,
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 16.0),
        Text(
          'Research Areas:',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text(
          researcherResearchAreas,
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 16.0),
        Text(
          'Publications:',
          style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 8.0),
        Text(
          researcherPublications,
          style: TextStyle(fontSize: 16.0),
        ),
        SizedBox(height: 25),


        ElevatedButton(
          onPressed: () {
            _navigateToWelcomePage(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Color.fromARGB(255, 117, 232, 151),
            foregroundColor: Colors.black,
            shadowColor: Color.fromARGB(255, 57, 114, 74),
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30),
            ),
            minimumSize: Size(100, 50),
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
        SizedBox(height: 25),

      ],
    );
  }

  void _navigateToWelcomePage(BuildContext context) {
    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 300),
        pageBuilder: (context, animation, secondaryAnimation) => const Welcome(), // Now directly linked
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
