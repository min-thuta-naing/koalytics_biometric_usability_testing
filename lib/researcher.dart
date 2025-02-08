import 'package:flutter/material.dart';
import 'sus_quest.dart';
import 'biometric_test.dart';  // Ensure this import is present


class ResearcherLanding extends StatelessWidget {
 const ResearcherLanding({super.key});


 @override
 Widget build(BuildContext context) {
   return Scaffold(
     appBar: AppBar(
       title: const Text('Researcher Dashboard'),
       backgroundColor: Colors.blue,
     ),
     body: Padding(
       padding: const EdgeInsets.all(16.0),
       child: Column(
         crossAxisAlignment: CrossAxisAlignment.start,
         children: [
           const Text(
             'Create New Project',
             style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
           ),
           const SizedBox(height: 10),
           ElevatedButton(
             onPressed: () {
               Navigator.push(
                 context,
                 MaterialPageRoute(builder: (context) => const SusQuest()),
               );
             },
             child: const Text('SUS Questionnaire'),
           ),
           ElevatedButton(
             onPressed: () {
               showDialog(
                 context: context,
                 builder: (BuildContext context) {
                   return const BiometricTestPopup(); // Open popup
                 },
               );
             },
             child: const Text('Biometric Usability Testing'),
           ),
           const SizedBox(height: 20),
           const Text(
             'View Previous Projects',
             style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
           ),
           const SizedBox(height: 10),
           ElevatedButton(
             onPressed: () {
               // TODO: Implement navigation to previous projects page
             },
             child: const Text('View Previous Projects'),
           ),
         ],
       ),
     ),
   );
 }
}
