import 'package:flutter/material.dart';
import '../researchers/researcher_dashboard.dart';
import 'login.dart';
import '../pre_signup.dart';
import 'sign_up.dart'; 


class Welcome extends StatelessWidget {
  const Welcome({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Color.fromARGB(255, 235, 238, 250),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [

              //logo image of Koalytics
              Image.asset('assets/logo.png', width: 250, height: 250),

              //welcome to koalytics text 
              const Text(
                'KOALYTICS',
                style: TextStyle(
                  fontSize: 30,
                  fontFamily: 'Panton',
                  //fontWeight: FontWeight.bold,
                ),
              ),

              //space between
              const SizedBox(height: 20),
               
              //space between 
              const SizedBox(height: 150),

              //Login button 
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    PageRouteBuilder(
                      transitionDuration: Duration(milliseconds: 500), // Animation speed
                      pageBuilder: (context, animation, secondaryAnimation) => const SignInPage2(),
                      transitionsBuilder: (context, animation, secondaryAnimation, child) {
                        const begin = Offset(1.0, 0.0); // Start from right
                        const end = Offset.zero; // End at normal position
                        const curve = Curves.easeInOut; // Smooth transition

                        var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                        var offsetAnimation = animation.drive(tween);

                        return SlideTransition(
                          position: offsetAnimation,
                          child: child,
                        );
                      },
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  foregroundColor: const Color.fromARGB(255, 255, 255, 255), 
                  backgroundColor: Color.fromARGB(255, 90, 121, 201),
                  // shadowColor: Color.fromARGB(255, 57, 114, 74),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  minimumSize: Size(200, 50),
                ),
                child: const Text(
                  'Log In',
                  style: TextStyle(
                    fontSize: 18,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),

              //space between 
              const SizedBox(height: 20),

              //signup button
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    PageRouteBuilder(
                      transitionDuration: Duration(milliseconds: 500), // Animation speed
                      pageBuilder: (context, animation, secondaryAnimation) => const SignUpPage(),
                      transitionsBuilder: (context, animation, secondaryAnimation, child) {
                        const begin = Offset(1.0, 0.0); // Start from right
                        const end = Offset.zero; // End at normal position
                        const curve = Curves.easeInOut; // Smooth transition

                        var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
                        var offsetAnimation = animation.drive(tween);

                        return SlideTransition(
                          position: offsetAnimation,
                          child: child,
                        );
                      },
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  foregroundColor: const Color.fromARGB(255, 255, 255, 255), 
                  backgroundColor: Color.fromARGB(255, 90, 121, 201),
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  minimumSize: Size(200, 50),
                ),
                child: const Text(
                  'Sign Up',
                  style: TextStyle(
                    fontSize: 18,
                    fontFamily: "Tommy",
                    fontWeight: FontWeight.bold,
                  ),
                ),
              )

            ],
          ),
        ),
      ),
    );
  }

  // Function to show the Signup Popup
  void _showSignupDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Sign Up As'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context); // Close the dialog
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const ResearcherDashboard()), // Change this to your Researcher Signup Page
                  );
                },
                child: const Text('Sign up as a Researcher'),
              ),
              const SizedBox(height: 10),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context); // Close the dialog
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const SignInPage2()), // Change this to your Participant Signup Page
                  );
                },
                child: const Text('Sign up as a Participant'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context); // Close the popup
              },
              child: const Text('Cancel'),
            ),
          ],
        );
      },
    );
  }
}
