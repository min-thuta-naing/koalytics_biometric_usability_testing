import 'package:flutter/material.dart';
import 'sus_quest.dart'; // Import the SUS questionnaire page

class SusDescription extends StatelessWidget {
  const SusDescription({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'SUS Description',
          style: TextStyle(
            fontFamily: "Tommy",
            fontSize: 25,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 90, 121, 201),
        iconTheme: const IconThemeData(
          color: Colors.white, // This makes the back arrow white
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'System Usability Scale (SUS) Questionnaire',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                fontFamily: "Tommy",
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              'The System Usability Scale (SUS) is a reliable and widely used tool for evaluating the usability of a system. '
              'It consists of 10 standardized statements designed to measure users’ perceptions of a system’s ease of use, complexity, consistency, and overall usability.\n\n'
              'In this questionnaire, you will be presented with 10 predefined statements about the system you just tested. '
              'You have the option to modify these questions if necessary to better reflect your experience with the system.\n\n'
              'Each question in the SUS questionnaire is carefully designed to capture different usability aspects, such as:\n'
              '• How frequently users would want to use the system.\n'
              '• Whether the system is unnecessarily complex.\n'
              '• How easy it is to learn and use the system.\n'
              '• Whether users require additional support or guidance.\n'
              '• The system’s consistency and coherence.\n\n'
              'The SUS score is calculated based on user responses and helps determine how user-friendly the system is. '
              'A higher SUS score generally indicates a more usable system, while a lower score suggests usability challenges that may need improvement.\n\n'
              'Please answer all questions carefully and honestly, as your feedback is crucial in enhancing the system’s design and user experience.',
              style: TextStyle(
                fontSize: 16,
                fontFamily: "Tommy",
                fontWeight: FontWeight.bold, 
                
              ),
              textAlign: TextAlign.justify,
            ),
            const SizedBox(height: 20),
            Center(

              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const SusQuest()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color.fromARGB(255, 90, 121, 201),
                  foregroundColor: const Color.fromARGB(255, 255, 255, 255),
                  //shadowColor: Color.fromARGB(255, 57, 114, 74),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  minimumSize: Size(200, 50),
                ),
                child: const Text(
                  'Start',
                  style: TextStyle(
                    fontSize: 18,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),


            ),
          ],
        ),
      ),
    );
  }
}
