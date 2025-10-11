import 'package:flutter/material.dart';
import 'package:koalytics_biometric_usability_testing/bio_app.dart';
import 'package:koalytics_biometric_usability_testing/bio_web.dart';
import '../sus/sus_quest.dart';
import '../biometric_test.dart';
import '../sus/sus_description.dart';

class ResearcherDashboard extends StatefulWidget {
  const ResearcherDashboard({super.key});

  @override
  _ResearcherDashboardState createState() => _ResearcherDashboardState();
}

class _ResearcherDashboardState extends State<ResearcherDashboard> {
  bool _isExpanded = false; // Controls sliding effect

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      //app bar 
      appBar: AppBar(
        title: const Text(
          'Main Dashboard',
          style: TextStyle(
            fontSize: 25,
            fontFamily: "Tommy",
            fontWeight: FontWeight.bold,
          ),
        ),
        //backgroundColor: Color.fromARGB(255, 193, 211, 254),
      ),

      //body part 
      body: SingleChildScrollView(
        child: Container(
          //color: Color.fromARGB(255, 193, 211, 254),
          child: Padding(
            padding: EdgeInsets.all(18),

            child: Center(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                              


                  // SUS Questionnaire Box
                  Stack(
                    children: [
                      Container(
                        padding: EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 235, 238, 250),
                          borderRadius: BorderRadius.circular(20),
                          // border: Border.all(
                          //   color: const Color.fromARGB(255, 90, 90, 90),
                          //   width: 2,
                          // ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'SUS (System Usability Scale)',
                              style: TextStyle(
                                fontSize: 18,
                                fontFamily: "Tommy",
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            SizedBox(height: 10),
                            Text(
                              'The SUS (System Usability Scale) questionnaire is a 10-item survey used to assess the overall usability of a system, using a Likert scale from 1 to 5 (strongly disagree to strongly agree).',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                fontSize: 15,
                                fontFamily: "Tommy",
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 60),
                          ],
                        ),
                      ),
                      Positioned(
                        right: 10,
                        bottom: 10,
                        child: Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: const Color.fromARGB(255, 90, 90, 90),
                              width: 2,
                            ),
                            borderRadius: BorderRadius.circular(50),
                          ),
                          child: IconButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(builder: (context) => const SusDescription()),
                              );
                            },
                            icon: Icon(
                              Icons.add,
                              size: 30,
                              color: Color.fromRGBO(255, 217, 229, 1),                            
                            ),
                            padding: EdgeInsets.all(10),
                            splashColor: Color.fromARGB(255, 0, 0, 0),
                            highlightColor: Color.fromARGB(255, 0, 0, 0),
                            style: IconButton.styleFrom(
                              backgroundColor: const Color.fromARGB(255, 90, 90, 90),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 30),

                  // Biometric Usability Testing Box with Slide-down Effect
                  Stack(
                    children: [
                      Container(
                        padding: EdgeInsets.all(15),
                        decoration: BoxDecoration(
                          color: Color.fromARGB(255, 235, 238, 250),
                          borderRadius: BorderRadius.circular(20),
                          // border: Border.all(
                          //   color: const Color.fromARGB(255, 90, 90, 90),
                          //   width: 2,
                          // ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Biometric Usability Testing',
                              style: TextStyle(
                                fontSize: 18,
                                fontFamily: "Tommy",
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            SizedBox(height: 10),
                            Text(
                              'The usability test can be performed using biometric tools such as facial expression, respiratory rate, and heart rate. The researchers can perform the test on websites and applications.',
                              textAlign: TextAlign.justify,
                              style: TextStyle(
                                fontSize: 15,
                                fontFamily: "Tommy",
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            const SizedBox(height: 60),
                          ],
                        ),
                      ),
                      Positioned(
                        right: 10,
                        bottom: 10,
                        child: Container(
                          decoration: BoxDecoration(
                            // border: Border.all(
                            //   color: const Color.fromARGB(255, 90, 90, 90),
                            //   width: 2,
                            // ),
                            borderRadius: BorderRadius.circular(50),
                          ),
                          child: IconButton(
                            onPressed: () {
                              setState(() {
                                _isExpanded = !_isExpanded; // Toggle visibility
                              });
                            },
                            icon: Icon(
                              _isExpanded ? Icons.remove : Icons.add, // Toggle icon
                              size: 30,
                              color: Color.fromRGBO(255, 217, 229, 1),
                            ),
                            padding: EdgeInsets.all(10),
                            splashColor: Color.fromARGB(255, 0, 0, 0),
                            highlightColor: Color.fromARGB(255, 0, 0, 0),
                            style: IconButton.styleFrom(
                              backgroundColor: const Color.fromARGB(255, 90, 90, 90),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 10),

                  // Sliding Down Box
                  AnimatedContainer(
                    duration: Duration(milliseconds: 300),
                    height: _isExpanded ? 160 : 0, // Adjust height to fit buttons
                    padding: EdgeInsets.all(15),
                    decoration: BoxDecoration(
                      color: Color.fromARGB(255, 235, 238, 250),
                      borderRadius: BorderRadius.circular(20),
                      // border: Border.all(
                      //   color: Color.fromARGB(255, 90, 90, 90),
                      //   width: 2,
                      // ),
                    ),
                    child: _isExpanded
                        ? SingleChildScrollView(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'This section provides additional details for Biometric Usability Testing. Choose an option below:',
                                textAlign: TextAlign.justify,
                                style: TextStyle(
                                  fontSize: 15,
                                  fontFamily: "Tommy",
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                              const SizedBox(height: 10),

                              // Buttons
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: [
                                  TextButton(
                                    onPressed: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(builder: (context) => const BiometricApp()), // For App
                                      );
                                    },
                                    style: TextButton.styleFrom(
                                      backgroundColor: Color.fromARGB(255, 90, 121, 201), // Soft green
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                    ),
                                    child: const Text(
                                      'for app',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontFamily: "Tommy",
                                        fontWeight: FontWeight.bold,
                                        color: Color.fromARGB(255, 255, 255, 255),
                                      ),
                                    ),
                                  ),
                                  TextButton(
                                    onPressed: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(builder: (context) => const BiometricWeb()), // For Web
                                      );
                                    },
                                    style: TextButton.styleFrom(
                                      backgroundColor: Color.fromARGB(255, 90, 121, 201), // Soft pink
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                    ),
                                    child: const Text(
                                      'for web',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontFamily: "Tommy",
                                        fontWeight: FontWeight.bold,
                                        color: Color.fromARGB(255, 255, 255, 255),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        )
                        : null,
                  ),

                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

